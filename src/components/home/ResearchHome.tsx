'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Mail, MapPin, Landmark, GraduationCap, Maximize2, X } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { SiteConfig } from '@/lib/config';
import type { Publication } from '@/types/publication';

type Submission = { id: string; forum: string; title: string; authors: string[]; equal?: boolean; manuscript?: boolean; desc: string; zh: string; figure: string; figZh: string };
type PaperCard = { id: string; title: string; venue: string; url: string; doi?: string; figure: string; alt: string; desc: string; credit?: string; authors: Publication['authors']; submission?: boolean; selected?: boolean };
type Props = { author: SiteConfig['author']; social: SiteConfig['social']; papers: Publication[]; submissions: Submission[] };
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const notes: Record<string, [string, string, string]> = {
  llm4mac: ['From observations to protocol actions and feedback', '从无线观测到协议动作和环境反馈', '把无线环境中的观测写成自然语言后，智能体通过与环境交互学习如何调度传输。'],
  plc: ['Pareto-Lenient Consensus for multiple preferences', '多偏好对齐中的宽容共识机制', '当偏好目标发生冲突时，允许某个目标暂时退让，可能帮助模型走出局部折中，找到整体更好的策略。'],
  pac: ['Competing providers in a federated learning system', '联邦学习系统中相互竞争的服务提供商', '在没有中央协调者的情况下，多个服务提供商分别学习如何分配通信与计算资源。'],
  mac: ['A base station serving a changing set of wireless users', '基站与动态接入的无线用户', '语言模型智能体学习无线接入协议，在用户加入或离开时调整策略，无需重新训练。']
};

export default function ResearchHome({ author, social, papers, submissions }: Props) {
  const zh = useLocaleStore(state => state.locale) === 'zh';
  const [filter, setFilter] = useState('selected');
  const [expanded, setExpanded] = useState<PaperCard | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const translation = (en: string, chinese: string) => zh ? chinese : en;
  const articles: PaperCard[] = papers.map(paper => ({
    id: paper.id, title: paper.title, authors: paper.authors, doi: paper.doi, selected: paper.selected,
    venue: [paper.journal === 'IEEE Transactions on Mobile Computing' ? paper.journal + ' (TMC)' : paper.journal || paper.conference, paper.id === 'plc' ? null : paper.year].filter(Boolean).join(' · '),
    url: paper.url || '', figure: base + paper.preview, desc: zh ? notes[paper.id]?.[2] || paper.description || '' : paper.description || '',
    alt: notes[paper.id]?.[zh ? 1 : 0] || paper.title
  }));
  const incoming: PaperCard[] = submissions.map(sub => ({
    id: sub.id, title: sub.title, url: 'https://openreview.net/forum?id=' + sub.forum,
    authors: sub.authors.map(name => ({ name, isHighlighted: name === author.name })),
    venue: sub.manuscript ? translation('Research manuscript · 2026', '研究手稿 · 2026') : translation('ICLR 2027 submission', 'ICLR 2027 投稿'), figure: base + '/papers/' + sub.id + '.webp',
    alt: zh ? sub.figZh : sub.figure, desc: zh ? sub.zh : sub.desc, submission: true,
    credit: sub.equal ? translation('Co-first author', '共同第一作者') : undefined
  }));
  const all = [...incoming, ...articles];
  const selected = articles.filter(paper => paper.selected);
  const visible = filter === 'all' ? all : selected;
  const education = [
    ['zju', '2024 — 2029', translation('Zhejiang University', '浙江大学'), translation('College of Information Science and Electronic Engineering', '信息与电子工程学院'), translation('PhD in Information and Communication Engineering (in progress)', '信息与通信工程 · 博士在读')],
    ['scu', '2020 — 2024', translation('Sichuan University', '四川大学'), translation('College of Electronics and Information Engineering', '电子信息学院'), translation('Bachelor of Engineering in Information and Communication Engineering', '信息与通信工程 · 工学学士')]
  ];
  const news = [
    ['2026.11', 'mac', 'Agentic MAC Protocols', 'IEEE Transactions on Mobile Computing'],
    ['2026.07', 'plc', 'Beyond Compromise', 'Findings of ACL 2026'],
    ['2026.02', 'pac', 'Pareto Actor-Critic', 'IEEE Transactions on Mobile Computing'],
    ['2025.07', 'llm4mac', 'LLM4MAC', 'IEEE SPAWC 2025']
  ];
  return <div className="folio">
    <aside className="identity">
      {author.avatar && <Image className="portrait" src={base+author.avatar} alt={translation('Portrait of Renxuan Tan','谭韧轩的头像')} width={121} height={143} priority />}
      <h1>{author.name} <span lang="zh">（谭韧轩）</span></h1>
      <p className="affiliation">{translation('PhD Student', '博士研究生')}</p>
      <ul className="contact"><li><Landmark/>{translation(author.institution, '浙江大学')}</li>
        <li><MapPin/>{translation('Hangzhou, China','中国 · 杭州')}</li>
        <li><Mail/><a href={'mailto:'+social.email}>{social.email}</a></li>
        <li><GraduationCap/><a href={String(social.google_scholar)}>Google Scholar</a></li>
      </ul>
    </aside>
    <div className="maincopy">
      <section id="about"><h2>{translation('About Me', '个人简介')}</h2>
        {zh ? <><p>我在浙江大学信息与电子工程学院攻读博士学位，是 <a href="https://rongpeng.info/team/">NICE 实验室</a>成员，导师是<a href="https://rongpeng.info/">李荣鹏教授</a>。此前，我在四川成都的四川大学电子信息学院获得工学学士学位。</p>
          <p>我目前的研究方向是<strong>大语言模型对齐</strong>、<strong>强化学习</strong>，以及<strong>大语言模型与强化学习在通信网络中的应用</strong>。</p></> :
          <><p>I’m a PhD student in the College of Information Science and Electronic Engineering at Zhejiang University, where I work in the <a href="https://rongpeng.info/team/">NICE Lab</a> under the supervision of <a href="https://rongpeng.info/">Prof. Rongpeng Li</a>. I received my bachelor’s degree from the College of Electronics and Information Engineering at Sichuan University in Chengdu, China.</p>
          <p>My current research focuses on <strong>large language model alignment</strong>, <strong>reinforcement learning</strong>, and <strong>LLMs and RL for communication networks</strong>.</p></>}
      </section>
      <section id="honors"><h2>{translation('Honors', '个人荣誉')}</h2>
        <ul className="dated"><li><span>2024</span>{translation('Outstanding Graduate of Sichuan Province', '四川省优秀毕业生')}</li>
          <li><span>2023–2024</span>{translation('National Scholarship for Undergraduates','本科生国家奖学金')}</li>
          <li><span>2022–2023</span>{translation('National Scholarship for Undergraduates','本科生国家奖学金')}</li></ul>
      </section>
      <section id="news"><h2>{translation('News', '近期动态')}</h2>
        <ul className="dated">{news.map(([date,id,title,venue])=>{
          const paper = articles.find(item=>item.id === id);
          if (!paper) return null;
          return <li key={id}><time dateTime={date.replace('.','-')}>{date}</time><div><a href={paper.doi ? 'https://doi.org/'+paper.doi : paper.url}>{title}</a>{translation(' appeared in ', ' 发表于 ')}<em>{venue}</em>{translation('.', '。')}</div></li>;
        })}</ul>
      </section>
      <section id="research"><div className="section-head"><h2>{translation('Selected Publications', '代表性研究')}</h2><a href={String(social.google_scholar)}>Google Scholar</a></div>
        <div aria-label={translation('Filter research', '筛选研究')} role="group" className="filters">{[
          ['selected',translation('Highlights', '精选'),selected.length],['all',translation('All Works', '全部研究'),all.length]
        ].map(([key,label,count])=><button type="button" key={key} aria-pressed={filter === key} onClick={()=>setFilter(String(key))}>{label} <small>{count}</small></button>)}</div>
        <div>{visible.map(paper=><article key={paper.id} className="entry">
          <button type="button" className="figure" onClick={()=>{setExpanded(paper);dialog.current?.showModal();}} aria-label={translation('Enlarge figure: ', '查看大图：') + paper.alt}>
            <Image src={paper.figure} alt={paper.alt} width={560} height={320}/><span className="pub-badge">{paper.venue.startsWith('IEEE Transactions on Mobile Computing') ? 'TMC 2026 · CCF-A' : paper.id === 'plc' ? 'ACL Findings 2026' : paper.venue}</span><span className="expand"><Maximize2 size={14}/></span>
          </button>
          <div><div className="meta"><span>{paper.venue}</span></div>
          <h3><a href={paper.doi ? 'https://doi.org/'+paper.doi : paper.url}>{paper.title}</a></h3>
          <p className="authors">{paper.authors.map((person,index)=><span key={person.name}>{index>0 && ', '}{person.isHighlighted ? <strong>{person.name}{paper.credit && ' ('+paper.credit+')'}</strong> : person.name}</span>)}</p>
          <p className="desc">{paper.desc}</p><a className="paper-link" href={paper.url}>{paper.submission ? 'OpenReview' : paper.id === 'plc' ? 'ACL Anthology' : 'arXiv'}</a>{paper.doi && <> · <a className="paper-link" href={'https://doi.org/'+paper.doi}>DOI</a></>}</div>
        </article>)}</div>
      </section>
      <section id="internship"><h2>{translation('Internship', '实习经历')}</h2>
        <div className="record"><div><h3>{translation('Ant Group','蚂蚁集团')}</h3><p>{translation('Research Intern · Reinforcement learning for foundation model post-training', '研究实习生 · 基座模型后训练强化学习')}</p></div><span>2026.07 — 2027.01</span></div>
      </section>
      <section id="education"><h2>{translation('Education', '教育经历')}</h2>
        {education.map(([id,date,school,college,degree])=><div className="record edu" key={id}><Image src={base+'/schools/'+id+'.png'} alt="" width={52} height={52}/><div><h3>{school}</h3><p>{college}</p><p>{degree}</p></div><span>{date}</span></div>)}
      </section>
    </div>
    <dialog ref={dialog} aria-label={translation('Paper figure', '论文配图')} onClick={event=>{if(event.target===dialog.current) dialog.current?.close();}}>
      {expanded && <div className="lightbox"><button type="button" autoFocus onClick={()=>dialog.current?.close()} aria-label={translation('Close', '关闭')}><X size={21}/></button><Image src={expanded.figure} alt={expanded.alt} width={1200} height={750}/><p>{expanded.alt} · <a href={expanded.url}>{translation('Source paper', '论文原文')}</a></p></div>}
    </dialog>
  </div>;
}
