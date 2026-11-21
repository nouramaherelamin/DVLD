import React, { useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import LicentraDB from '../../services/db';

export default function NewsDetails() {
  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id');

  const articleId = paramId || queryId || 'article-1';

  const allArticles = useMemo(() => LicentraDB.getNews(), []);

  const article = useMemo(() => {
    return allArticles.find((a) => a.id === articleId) || allArticles[0] || {
      id: 'article-1',
      title: 'New Driving License Renewal Process Now Available Online',
      category: 'announcement',
      categoryLabel: 'Announcement',
      date: '15 Oct 2024',
      readTime: '4 min read',
      author: 'Ministry of Interior Traffic Command',
      image: '/assets/images/news/renewal_online.png',
      desc: 'Licentra introduces a faster and easier online renewal process to serve you better.',
      content: '<p>Licentra has officially announced the launch of its end-to-end digital renewal portal...</p>'
    };
  }, [allArticles, articleId]);

  useEffect(() => {
    document.title = `${article.title} | Licentra News`;
  }, [article]);

  const relatedArticles = useMemo(() => {
    return allArticles.filter((a) => a.id !== article.id).slice(0, 3);
  }, [allArticles, article]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      if (window.showToast) window.showToast('Article link copied to clipboard!', 'success');
    });
  };

  const currentUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);

  return (
    <main className="py-5 bg-surface">
      <div className="container py-3">
        {/* Breadcrumb */}
        <div className="mb-4">
          <ul className="licentra-breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li className="separator"><i className="bi bi-chevron-right"></i></li>
            <li><Link to="/news">News</Link></li>
            <li className="separator"><i className="bi bi-chevron-right"></i></li>
            <li className="current text-truncate" style={{ maxWidth: '300px' }}>
              {article.title}
            </li>
          </ul>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Main Article Column */}
          <div className="col-lg-8">
            <article className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card">
              {/* Header Meta */}
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <span className="badge bg-danger text-white rounded-pill px-3 py-1">
                  {article.categoryLabel || 'News'}
                </span>
                <span className="small text-muted">
                  <i className="bi bi-calendar3 me-1"></i> {article.date}
                </span>
                <span className="small text-muted">
                  <i className="bi bi-clock me-1"></i> {article.readTime || '3 min read'}
                </span>
              </div>

              {/* Title */}
              <h1 className="fw-bold text-navy mb-4 display-6">
                {article.title}
              </h1>

              {/* Author & Dept Byline */}
              <div className="d-flex align-items-center gap-3 pb-4 mb-4 border-bottom">
                <div className="user-avatar-circle" style={{ width: '44px', height: '44px', fontSize: '1.2rem' }}>
                  <i className="bi bi-building"></i>
                </div>
                <div>
                  <strong className="text-navy d-block">{article.author || 'Licentra Editorial Command'}</strong>
                  <small className="text-muted">Official Licentra Editorial Release</small>
                </div>
              </div>

              {/* Hero Image */}
              <div className="article-header-hero mb-4">
                <img src={article.image} alt={article.title} className="img-fluid rounded-4 w-100" />
              </div>

              {/* Article Body */}
              <div 
                className="article-body-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share Bar */}
              <div className="d-flex flex-wrap align-items-center justify-content-between pt-4 mt-5 border-top">
                <div className="fw-semibold text-navy small mb-2 mb-sm-0">
                  <i className="bi bi-share me-1 text-red"></i> Share this official update:
                </div>
                <div className="share-btn-group d-flex gap-2">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareTitle}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on Twitter"
                  >
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on LinkedIn"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <button 
                    type="button" 
                    onClick={handleCopyLink} 
                    title="Copy article link" 
                    aria-label="Copy Link"
                  >
                    <i className="bi bi-link-45deg"></i>
                  </button>
                </div>
              </div>
            </article>

            {/* Back to News Button */}
            <div className="mt-4">
              <Link to="/news" className="btn btn-licentra-outline-red">
                <i className="bi bi-arrow-left me-1"></i> Back to News &amp; Media
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card mb-4">
              <h5 className="fw-bold text-navy mb-3">
                <i className="bi bi-newspaper text-red me-2"></i> Related Articles
              </h5>
              <div>
                {relatedArticles.map((rel) => (
                  <div key={rel.id} className="mb-3 pb-3 border-bottom">
                    <span className="badge bg-danger-subtle text-danger mb-1" style={{ fontSize: '0.7rem' }}>
                      {rel.categoryLabel}
                    </span>
                    <h6 className="fw-semibold mb-1">
                      <Link to={`/news/${rel.id}`} className="text-navy text-decoration-none">
                        {rel.title}
                      </Link>
                    </h6>
                    <small className="text-muted"><i className="bi bi-calendar3 me-1"></i> {rel.date}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Services Links */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card mb-4">
              <h5 className="fw-bold text-navy mb-3">
                <i className="bi bi-lightning-charge text-red me-2"></i> Quick Services
              </h5>
              <ul className="list-unstyled mb-0" style={{ lineHeight: '2.2' }}>
                <li>
                  <Link to="/services/first-license" className="text-secondary">
                    <i className="bi bi-arrow-right text-red me-2"></i> First Driving License
                  </Link>
                </li>
                <li>
                  <Link to="/services/renewal" className="text-secondary">
                    <i className="bi bi-arrow-right text-red me-2"></i> License Renewal
                  </Link>
                </li>
                <li>
                  <Link to="/driving-tests" className="text-secondary">
                    <i className="bi bi-arrow-right text-red me-2"></i> Driving Tests Booking
                  </Link>
                </li>
                <li>
                  <Link to="/license-classes" className="text-secondary">
                    <i className="bi bi-arrow-right text-red me-2"></i> Vehicle Class Categories
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

