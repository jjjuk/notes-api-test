CREATE TABLE "public"."User" ( 
	id                SERIAL PRIMARY KEY,
  "name"            VARCHAR(50) DEFAULT(''),
  "email"           TEXT UNIQUE NOT NULL,
  "password"        TEXT NOT NULL 
);

CREATE TABLE "public"."Note" ( 
	id                SERIAL PRIMARY KEY,
  "userId"          INT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id) ON DELETE CASCADE,
  "content"         VARCHAR(1000)
);
