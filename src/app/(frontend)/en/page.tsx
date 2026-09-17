import configPromise from '@payload-config'
import { getPayload } from 'payload'
import styles from '../es/page.module.css'

export const dynamic = 'force-dynamic'

export default async function EnglishHomePage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    locale: 'en',
    fallbackLocale: false,
    overrideAccess: false,
    depth: 1,
    sort: '-publishedAt',
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          title: {
            exists: true,
          },
        },
        {
          summary: {
            exists: true,
          },
        },
      ],
    },
  })

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p>CDA Robotics</p>
        <h1>Proof of concept</h1>
        <p>Articles published in English</p>
      </header>

      <section className={styles.articles}>
        {articles.length === 0 && <p>There are no published articles available in English.</p>}

        {articles.map((article) => {
          const image = typeof article.image === 'object' ? article.image : null

          return (
            <article className={styles.card} key={article.id}>
              {image?.url && <img className={styles.image} src={image.url} alt={image.alt} />}

              <div className={styles.content}>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>

                <dl className={styles.details}>
                  <div>
                    <dt>Status</dt>
                    <dd>{article.workflowStatus}</dd>
                  </div>

                  <div>
                    <dt>Slug</dt>
                    <dd>{article.slug}</dd>
                  </div>
                </dl>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
