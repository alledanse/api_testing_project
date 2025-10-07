import { test as setup } from '@playwright/test';
import user from '../.auth/user.json';
import fs from 'fs';

const authFile = '.auth/user.json';

setup('authentication', async ({ request }) => {
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: { email: 'pw123test@test.com', password: 'Welcome123' },
    },
  });
  const data = await response.json();
  const accessToken = data.user.token;
  user.origins[0].localStorage[0].value = accessToken;
  fs.writeFileSync(authFile, JSON.stringify(user));

  process.env['ACCESS_TOKEN'] = accessToken;
});
