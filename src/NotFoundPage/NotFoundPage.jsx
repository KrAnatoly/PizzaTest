import React from 'react';

function NotFoundPage() {
  return (
    <div className="not-found">
      <p>Страница не найдена :(</p>
      {' '}
      <a href="/"><button type="button">На главную</button></a>
    </div>
  );
}

export default NotFoundPage;
