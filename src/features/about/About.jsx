import React from 'react';

const skillsJS = ['ES5+', 'Promise API', 'React', 'Redux', 'Jest', 'webpack', 'gulp'];
const skillsHtml = ['семантичность', 'валидность', 'доступность'];
const skillsCss = ['адаптивность', 'кроссбраузерность', 'SCSS', 'БЭМ', 'flexbox', 'grid'];
const skillsGit = [
  'базовые операции (push, pull, reset, rebase, stash, log)',
  'ветвление',
  'описание коммитов в стиле Conventional Commits',
];

function About() {
  return (
    <>
      <h1>Обо мне</h1>
      <p>
        Нравится делать удобные, доступные интерфейсы и веб приложения, поэтому мне интересен
        frontend и хочется дальше развиваться в этом направлении.
      </p>
      <hr />
      <h3>Проекты:</h3>
      <p>
        <a href="https://github.com/f4hr" target="_blank" rel="noreferrer">
          Профиль на GitHub
        </a>
      </p>
      <p>
        Чат (Slack) -{' '}
        <a href="https://github.com/f4hr/frontend-project-lvl4" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
        Real-time приложение на React/Redux, использует AJAX, REST, websockets, Jest, React (с
        хуками) + Redux (@reduxjs/toolkit) + Formik, CI/CD (GitHub + Heroku)
      </p>
      <p>
        RSS агрегатор -{' '}
        <a href="https://github.com/f4hr/frontend-project-lvl3" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
        Чистый JS, webpack, Bootstrap, AJAX, Jest, валидация данных, CI/CD (GitHub + Vercel)
      </p>
      <p>
        Вычислитель отличий -{' '}
        <a href="https://github.com/f4hr/frontend-project-lvl2" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
        CLI приложение для нахождения отличий между двумя файлами в форматах json или yaml.
        Поддерживает рекурсивную структуру данных. Написано на чистом JS, тесты на Jest
      </p>
      <hr />
      <h3>Навыки:</h3>
      <p className="fw-bold mb-1">JavaScript:</p>
      <p>
        {skillsJS.map((skill) => (
          <span key={skill}>
            <span className="badge bg-warning text-dark">{skill}</span>{' '}
          </span>
        ))}
      </p>
      <p className="fw-bold mb-1">HTML:</p>
      <p>
        {skillsHtml.map((skill) => (
          <span key={skill}>
            <span className="badge" style={{ backgroundColor: '#f1652a' }}>
              {skill}
            </span>{' '}
          </span>
        ))}
      </p>
      <p className="fw-bold mb-1">CSS:</p>
      <p>
        {skillsCss.map((skill) => (
          <span key={skill}>
            <span className="badge bg-primary">{skill}</span>{' '}
          </span>
        ))}
      </p>
      <p className="fw-bold mb-1">Git:</p>
      <p>
        {skillsGit.map((skill) => (
          <span key={skill}>
            <span className="badge bg-dark">{skill}</span>{' '}
          </span>
        ))}
      </p>
      <hr />
      <h3>Английский язык:</h3>
      <p>Читаю статьи и техническую литературу, слушаю подкасты, смотрю фильмы и сериалы</p>
      <hr />
      <h3>Хобби:</h3>
      <p>Играю в музыкальной группе, интересуюсь геймдевом и компьютерной графикой</p>
    </>
  );
}

export default About;
