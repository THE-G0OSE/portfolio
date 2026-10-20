import { hash } from 'bcryptjs';

// usage: yarn admin:hash <password>
// put the output into ADMIN_PASSWORD_HASH in backend/.env (inside single quotes)
const password = process.argv[2];

if (!password) {
  console.error('Usage: yarn admin:hash <password>');
  process.exit(1);
}

void hash(password, 12).then((result) => console.log(result));
