import configPromise from '@payload-config'
import { getPayload } from 'payload'

import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function SpanishHomePage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    locale: 'es',
    fallbackLocale: false,
    overrideAccess: false,
    depth: 1,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p>CDA Robotics</p>
        <h1>Prueba de concepto</h1>
        <p>Artículos publicados en español</p>
      </header>

      <section className={styles.articles}>
        {articles.length === 0 && <p>No existen artículos publicados.</p>}

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
                    <dt>Estado</dt>
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
