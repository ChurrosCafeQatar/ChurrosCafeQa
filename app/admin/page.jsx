import ContentStudio from '../../components/content-studio';

export const metadata = {
  title: 'Content studio',
  description: 'Local content editing workspace for Churros Cafe.',
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminPage() {
  return <ContentStudio />;
}
