const ru = {
  translation: {
    header: {
      title: 'Hexlet Chat',
    },
    auth: {
      loginTitle: 'Войти',
      loginButton: 'Войти',
      logoutButton: 'Выйти',
      loginFormButton: 'Войти',
      nameInput: 'Ваш ник',
      passwordInput: 'Пароль',
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
    },
    signup: {
      title: 'Регистрация',
      nameInput: 'Имя пользователя',
      passwordInput: 'Пароль',
      passwordConfirmationInput: 'Подтвердите пароль',
      signupButton: 'Зарегистрироваться',
    },
    channels: {
      title: 'Каналы',
      tag: '#',
      addСhannel: 'Добавить канал',
      manageСhannel: 'Управление каналом',
      renameСhannel: 'Переименовать канал',
      deleteСhannel: 'Удалить канал',
    },
    messages: {
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
    },
    error: {
      wrongLength: 'От 3 до 20 символов',
      wrongLengthPassword: 'Не менее 6 символов',
      necessary: 'Обязательное поле',
      notSamePasswords: 'Пароли должны совпадать',
      wrongNameOrPassword: 'Неверные имя пользователя или пароль',
      mustBeUnique: 'Должно быть уникальным',
    },
    notifies: {
      addChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
    },
    interfaces: {
      add: '+',
      send: 'Отправить',
      sendMessage: 'Отправить',
      cancel: 'Отменить',
      sure: 'Уверены?',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    noMatch: {
      pageNotFound: '404 Страница не найдена',
      routing: {
        canGo: 'Но вы можете перейти',
        toPage: 'на главную страницу.',
      },
    },
  },
};

export default ru;
