import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout, { Name } from 'components/Layout'
import { motion } from 'framer-motion'
import { fadeIn, stagger} from 'components/MotionA'
import { fetchEntriesCode } from 'utils/contentfulPosts'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

export default function Code ({ code }) {

  const codeItems = code.map((c) =>
    <motion.li 
      key={c.sys.id}
      className="code"
      variants={fadeIn}
    >

        <a href={c.fields.link} target="_blank" rel="noreferrer">
          <img 
            src={c.fields.image[0].secure_url} 
            alt={c.fields.title} 
          />
        </a>

      <motion.div
        className="code-description"
      >
        <h3>{c.fields.title}</h3>
        <p>{c.fields.description}</p>
        {/* <hr/> */}
        <br/>
        <div className="code-deliverables">
          <div className="code-sub-desc">
            <h5>DELIVERED</h5>
            <p>{c.fields.delivered}</p>
          </div>
          <div className="code-links">
            <a href={c.fields.link} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href={c.fields.gitLink} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.li>
  )

  return (
    <Layout>
      <Head>
        <title>Code | { Name }</title>
      </Head>
      <main>
        <motion.ul 
          className="code-wrapper"
          animate="animate"
          initial="initial"
          exit={{ opacity: 0 }}
          variants={stagger}
        >
          {codeItems}
        </motion.ul>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  let data = await fetchEntriesCode()

  return {
    props: {
      code: await data ?? null,
    },
    revalidate: 1,
  }
}