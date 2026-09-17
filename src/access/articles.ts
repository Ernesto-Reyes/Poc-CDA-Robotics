import type { Access, Where } from 'payload'

export const canCreateArticle: Access = ({ req: { user }, data }) => {
  if (!user) return false

  if (user.role === 'admin') {
    return true
  }

  if (user.role === 'marketing') {
    return data?._status !== 'published'
  }

  return false
}

export const canReadArticle: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') {
    return true
  }

  if (user?.role === 'marketing') {
    const ownArticles: Where = {
      author: {
        equals: user.id,
      },
    }

    return ownArticles
  }

  const publishedArticles: Where = {
    _status: {
      equals: 'published',
    },
  }

  return publishedArticles
}

export const canUpdateArticle: Access = ({ req: { user }, data }) => {
  if (!user) return false

  if (user.role === 'admin') {
    return true
  }

  if (user.role === 'marketing') {
    if (data?._status === 'published') {
      return false
    }

    const ownArticles: Where = {
      author: {
        equals: user.id,
      },
    }

    return ownArticles
  }

  return false
}

export const canReadArticleVersions: Access = ({
  req: { user },
}) => {
  if (user?.role === 'admin') {
    return true
  }

  if (user?.role === 'marketing') {
    const ownVersions: Where = {
      'version.author': {
        equals: user.id,
      },
    }

    return ownVersions
  }

  return false
}