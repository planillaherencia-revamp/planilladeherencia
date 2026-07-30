-- Bug: 'base64url' no es una codificación válida para encode() en Postgres
-- (solo 'base64', 'hex', 'escape'). Esto rompía la creación de todo caso
-- nuevo con "unrecognized encoding: base64url". Se cambia a hex — más largo
-- pero siempre válido en una URL sin necesitar limpieza de caracteres.

alter table cases
  alter column access_token set default encode(gen_random_bytes(24), 'hex');
