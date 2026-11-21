import type { ReactNode } from 'react';
import Image from 'next/image';
import { BookOpen, BriefcaseBusiness, Camera, GraduationCap, Newspaper, UserRound } from 'lucide-react';

const sectionIcons = { about: UserRound, news: Newspaper, research: BookOpen, internship: BriefcaseBusiness, education: GraduationCap, life: Camera };

export function SectionHeading({ section, children }: { section: keyof typeof sectionIcons; children: ReactNode }) {
  const Icon = sectionIcons[section];
  return <h2 className="section-title"><span className="section-symbol" aria-hidden="true"><Icon /></span>{children}</h2>;
}

export function Biography({ zh }: { zh: boolean }) {
  const zju = <a href="https://www.zju.edu.cn/english/">{zh ? '浙江大学（ZJU）' : 'Zhejiang University (ZJU)'}</a>;
  const lab = <a href="https://rongpeng.info/team/">{zh ? 'NICE 实验室' : 'NICE Lab'}</a>;
  const advisor = <a href="https://rongpeng.info/">{zh ? '李荣鹏教授' : 'Prof. Rongpeng Li'}</a>;
  const scu = <a href="https://www.scu.edu.cn/">{zh ? '四川大学（SCU）' : 'Sichuan University (SCU)'}</a>;
  return <section id="about"><SectionHeading section="about">{zh ? '个人简介' : 'About Me'}</SectionHeading>
    {zh ? <>
      <p>我在{zju}信息与电子工程学院（ISEE）攻读博士学位，是{lab}的成员，导师是{advisor}。2024 年，我在成都的{scu}电子信息学院取得工学学士学位。</p>
      <p>我目前的研究兴趣包括<strong>大语言模型（LLM）对齐</strong>、<strong>强化学习（RL）</strong>，以及<strong>大语言模型与强化学习在通信网络中的应用</strong>。我喜欢探索不同领域的问题，也乐于和研究背景不同的朋友合作。</p>
      <p>研究之外，我喜欢健身、弹吉他和打篮球。</p></> : <>
      <p>I’m a PhD student in the College of Information Science and Electronic Engineering (ISEE) at {zju}. I work in the {lab} with {advisor}. In 2024, I earned my B.E. from the College of Electronics and Information Engineering at {scu} in Chengdu, China.</p>
      <p>My current research interests include <strong>Large Language Model (LLM) Alignment</strong>, <strong>Reinforcement Learning (RL)</strong>, and <strong>LLMs and RL for Communication Networks</strong>. I enjoy exploring questions across these fields, especially with collaborators who approach them from a different angle.</p>
      <p>Outside the lab, I like to lift weights, play guitar, and shoot hoops.</p></>}
  </section>;
}

type Headline = { id: string; date: string; emoji: string; text: ReactNode };

export function News({ zh, links }: { zh: boolean; links: Record<string,string> }) {
  const link = (id: string, title: string) => <a href={links[id]}>{title}</a>;
  const acceptance = (date: string, id: string, title: string, venue: string): Headline => ({
    id, date, emoji: '🎉🎉🎉',
    text: zh ? <>我们的论文 {link(id, title)} 获 {venue} 录用。</> : <>Our paper {link(id, title)} was accepted by {venue}.</>,
  });
  const news: Headline[] = [
    { id: 'iclr', date: '2026-09', emoji: '📝', text: zh ? <>我和合作者向 ICLR 2027 提交了 {link('oval','OVAL')}、{link('chat','CHAT')} 和 {link('etrace','E-TRACE')} 三篇论文。</> : <>My coauthors and I submitted three papers ({link('oval','OVAL')}, {link('chat','CHAT')}, and {link('etrace','E-TRACE')}) to ICLR 2027.</> },
    { id: 'ant', date: '2026-07', emoji: '💼', text: zh ? <>我加入<a href="#internship">蚂蚁集团</a>，开始基座模型后训练强化学习方向的研究实习。</> : <>I joined <a href="#internship">Ant Group</a> as a research intern working on RL for foundation model post-training.</> },
    acceptance('2026-06', 'mac', 'Agentic MAC Protocols', 'IEEE TMC'),
    acceptance('2026-04', 'plc', 'Beyond Compromise', 'Findings of ACL 2026'),
    acceptance('2025-08', 'pac', 'PAC-MCoFL', 'IEEE TMC'),
    acceptance('2025-05', 'llm4mac', 'LLM4MAC', 'IEEE SPAWC 2025'),
  ];
  return <section id="news"><SectionHeading section="news">{zh ? '近期动态' : 'News'}</SectionHeading>
    <ol className="newswire">{news.map(item=><li key={item.id}><time dateTime={item.date}>{item.date.replace('-','.')}</time><span aria-hidden="true" className="news-emoji">{item.emoji}</span><div>{item.text}</div></li>)}</ol>
  </section>;
}

const photos = [
  { file: 'pavilion', width: 1440, height: 1094, en: 'Posing by a lantern-lit pavilion among the trees', zh: '在林间亮着灯笼的小屋旁合影' },
  { file: 'cycling', width: 1039, height: 1560, en: 'Standing with my bicycle beneath the trees', zh: '戴着头盔，推着自行车站在树下' },
  { file: 'guitar', width: 1170, height: 1560, en: 'Playing acoustic guitar beside flowering trees', zh: '在开花的树旁弹木吉他' },
];

export function Life({ zh }: { zh: boolean }) {
  return <section id="life"><SectionHeading section="life">{zh ? '研究之外' : 'Outside the Lab'}</SectionHeading>
    <div className="life-photos">
      {photos.map(photo => {
        const src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/life/${photo.file}.webp`;
        return <a key={photo.file} href={src}>
          <Image src={src} width={photo.width} height={photo.height} alt={zh ? photo.zh : photo.en} />
        </a>;
      })}
    </div>
  </section>;
}
