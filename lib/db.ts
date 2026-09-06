import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface DbProduct {
    id: string;
    name: string;
    price: string;
    numericPrice: number;
    oldPrice: string | null;
    category: string | null;
    image: string | null;
    shortDescription: string | null;
    description: string | null;
    suitableFor: string | null;
    safetyProfile: string | null;
    proTip: string | null;
    attributes: Record<string, string>;
    keyActives: string[];
}

export interface OrderInput {
    id: string;
    customerName: string;
    customerEmail?: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    notes?: string;
    subtotal: number;
    shippingCharge: number;
    total: number;
    items: { productId: string; productName: string; unitPrice: number; quantity: number }[];
}

export interface DbOrder {
    id: string;
    customerName: string;
    customerEmail: string | null;
    customerPhone: string;
    shippingAddress: string;
    city: string | null;
    notes: string | null;
    subtotal: number;
    shippingCharge: number;
    total: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}

export interface DbOrderItem {
    id: number;
    orderId: string;
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
}

async function getDb() {
    const { env } = await getCloudflareContext({ async: true });
    return (env as unknown as { herbalicious_db: D1Database }).herbalicious_db;
}

function rowToProduct(row: Record<string, unknown>): DbProduct {
    return {
        id: row.id as string,
        name: row.name as string,
        price: row.price as string,
        numericPrice: row.numeric_price as number,
        oldPrice: (row.old_price as string) ?? null,
        category: (row.category as string) ?? null,
        image: (row.image as string) ?? null,
        shortDescription: (row.short_description as string) ?? null,
        description: (row.description as string) ?? null,
        suitableFor: (row.suitable_for as string) ?? null,
        safetyProfile: (row.safety_profile as string) ?? null,
        proTip: (row.pro_tip as string) ?? null,
        attributes: row.attributes_json ? JSON.parse(row.attributes_json as string) : {},
        keyActives: row.key_actives_json ? JSON.parse(row.key_actives_json as string) : [],
    };
}

export async function listProducts(): Promise<DbProduct[]> {
    const db = await getDb();
    const { results } = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    return results.map(rowToProduct);
}

export async function getProductById(id: string): Promise<DbProduct | null> {
    const db = await getDb();
    const row = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
    return row ? rowToProduct(row) : null;
}

export interface ProductWriteInput {
    id: string;
    name: string;
    price: string;
    oldPrice?: string | null;
    category?: string | null;
    image?: string | null;
    shortDescription?: string | null;
    description?: string | null;
    suitableFor?: string | null;
    safetyProfile?: string | null;
    proTip?: string | null;
    attributes?: Record<string, string>;
    keyActives?: string[];
}

function numericPriceFrom(price: string): number {
    const digits = price.replace(/[^0-9]/g, '');
    return digits ? parseInt(digits, 10) : 0;
}

export async function createProduct(input: ProductWriteInput): Promise<void> {
    const db = await getDb();
    await db
        .prepare(
            `INSERT INTO products (id, name, price, numeric_price, old_price, category, image, short_description, description, suitable_for, safety_profile, pro_tip, attributes_json, key_actives_json)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
            input.id,
            input.name,
            input.price,
            numericPriceFrom(input.price),
            input.oldPrice ?? null,
            input.category ?? null,
            input.image ?? null,
            input.shortDescription ?? null,
            input.description ?? null,
            input.suitableFor ?? null,
            input.safetyProfile ?? null,
            input.proTip ?? null,
            JSON.stringify(input.attributes ?? {}),
            JSON.stringify(input.keyActives ?? [])
        )
        .run();
}

export async function updateProduct(id: string, input: ProductWriteInput): Promise<void> {
    const db = await getDb();
    await db
        .prepare(
            `UPDATE products SET name = ?, price = ?, numeric_price = ?, old_price = ?, category = ?, image = ?,
             short_description = ?, description = ?, suitable_for = ?, safety_profile = ?, pro_tip = ?,
             attributes_json = ?, key_actives_json = ?, updated_at = datetime('now')
             WHERE id = ?`
        )
        .bind(
            input.name,
            input.price,
            numericPriceFrom(input.price),
            input.oldPrice ?? null,
            input.category ?? null,
            input.image ?? null,
            input.shortDescription ?? null,
            input.description ?? null,
            input.suitableFor ?? null,
            input.safetyProfile ?? null,
            input.proTip ?? null,
            JSON.stringify(input.attributes ?? {}),
            JSON.stringify(input.keyActives ?? []),
            id
        )
        .run();
}

export async function deleteProduct(id: string): Promise<void> {
    const db = await getDb();
    await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
}

function rowToOrder(row: Record<string, unknown>): DbOrder {
    return {
        id: row.id as string,
        customerName: row.customer_name as string,
        customerEmail: (row.customer_email as string) ?? null,
        customerPhone: row.customer_phone as string,
        shippingAddress: row.shipping_address as string,
        city: (row.city as string) ?? null,
        notes: (row.notes as string) ?? null,
        subtotal: row.subtotal as number,
        shippingCharge: (row.shipping_charge as number) ?? 0,
        total: (row.total as number) ?? (row.subtotal as number),
        status: row.status as string,
        paymentMethod: row.payment_method as string,
        createdAt: row.created_at as string,
        updatedAt: row.updated_at as string,
    };
}

function rowToOrderItem(row: Record<string, unknown>): DbOrderItem {
    return {
        id: row.id as number,
        orderId: row.order_id as string,
        productId: row.product_id as string,
        productName: row.product_name as string,
        unitPrice: row.unit_price as number,
        quantity: row.quantity as number,
    };
}

export async function createOrder(input: OrderInput): Promise<void> {
    const db = await getDb();
    const statements = [
        db
            .prepare(
                `INSERT INTO orders (id, customer_name, customer_email, customer_phone, shipping_address, city, notes, subtotal, shipping_charge, total)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                input.id,
                input.customerName,
                input.customerEmail ?? null,
                input.customerPhone,
                input.shippingAddress,
                input.city,
                input.notes ?? null,
                input.subtotal,
                input.shippingCharge,
                input.total
            ),
        ...input.items.map((item) =>
            db
                .prepare(
                    `INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
                     VALUES (?, ?, ?, ?, ?)`
                )
                .bind(input.id, item.productId, item.productName, item.unitPrice, item.quantity)
        ),
    ];
    await db.batch(statements);
}

export async function listOrders(): Promise<DbOrder[]> {
    const db = await getDb();
    const { results } = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    return results.map(rowToOrder);
}

export async function getOrderWithItems(id: string): Promise<{ order: DbOrder; items: DbOrderItem[] } | null> {
    const db = await getDb();
    const orderRow = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first();
    if (!orderRow) return null;
    const { results } = await db.prepare('SELECT * FROM order_items WHERE order_id = ?').bind(id).all();
    return { order: rowToOrder(orderRow), items: results.map(rowToOrderItem) };
}

export async function updateOrderStatus(id: string, status: string): Promise<void> {
    const db = await getDb();
    await db.prepare("UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?").bind(status, id).run();
}
