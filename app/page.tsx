import HomeClient from '@/components/HomeClient';
import { getPageBySlug } from '@/lib/wordpress.ts';
import FAQSchema from '@/components/FAQSchema';
import { globalFAQs } from '@/src/data/faqs';

export default async function HomePage() {
    // Fetch home page content from WordPress (Optional)
    // const wpPage = await getPageBySlug('home');

    return (
        <>
            <FAQSchema faqs={globalFAQs} />
            <HomeClient />
        </>
    );
}
