import jwt from 'jsonwebtoken';
import Mock from '../mock';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '5 days';

const userList = [
  {
    id: 1,
    role: 'SA',
    name: 'Daniel Cordeiro',
    username: 'daniel_cordeiro',
    email: 'daniel@pma.com',
    password: 'Daniel223',
  },
  {
    id: 2,
    role: 'SA',
    name: 'Ninha',
    username: 'maria_da_luz',
    email: 'ninha2023@pma.com',
    password: 'Mariapma2023',
  },
  {
    id: 3,
    role: 'SA',
    name: 'Aline Macena',
    username: 'aline_macena',
    email: 'aline2023@pma.com',
    password: 'Alinepma2023',
  },
];

Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, password } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email && u.password === password);
    if (!user || !password) {
      return { message: 'Senha ou Email invalido' };
    }
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onPost('/api/auth/register').reply((config) => {
  try {
    const { email, username } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (user) {
      return [400, { message: 'User already exists!' }];
    }
    const newUser = {
      id: 2,
      role: 'GUEST',
      name: '',
      username: username,
      email: email,
      avatar: '/assets/images/face-6.jpg',
      age: 25,
    };
    userList.push(newUser);

    const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: newUser.id,
          avatar: newUser.avatar,
          email: newUser.email,
          name: newUser.name,
          username: newUser.username,
          role: newUser.role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onGet('/api/auth/profile').reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Invalid Authorization token' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = userList.find((u) => u.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
