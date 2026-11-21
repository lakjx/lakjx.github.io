import { getBibtexContent } from '@/lib/content';
import { parseBibTeX } from '@/lib/bibtexParser';
import { getConfig } from '@/lib/config';
import submissions from '../../content/submissions.json';
import ResearchHome from '@/components/home/ResearchHome';

export default function Home() {
  const { author, social } = getConfig();
  const papers = parseBibTeX(getBibtexContent('publications.bib'));
  return <ResearchHome author={author} social={social} papers={papers} submissions={submissions} />;
}
