/*
--Delete database(chess) if exist--
DROP DATABASE IF EXISTS chess;
--Create database chess--
CREATE DATABASE chess;
 */

--Drop(delete) primary key on user account(id)--
ALTER TABLE IF EXISTS ONLY user_account DROP CONSTRAINT IF EXISTS pk_account_id CASCADE;
--Delete table(user_account) if exist--
DROP TABLE IF EXISTS user_account;
--Create user_account table and unique username parameter--
CREATE TABLE user_account (
    id SERIAL NOT NULL ,
    name TEXT,
    username TEXT,
    password TEXT,
    UNIQUE (username)
);
--Create primary key for user_account(id)--
ALTER TABLE ONLY user_account ADD CONSTRAINT pk_account_id PRIMARY KEY (id);


--Drop(delete) foreign key on saved_games(user_id)-->user_account(id)--
ALTER TABLE IF EXISTS ONLY saved_games DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;
--Drop(delete) foreign key on saved_games(enemy_id)-->user_account(id)--
ALTER TABLE IF EXISTS ONLY saved_games DROP CONSTRAINT IF EXISTS fk_enemy_id CASCADE ;
--Delete table(saved_games) if exist--
DROP TABLE IF EXISTS saved_games;
--Create saved_games table--
CREATE TABLE saved_games (
    user_id INTEGER,
    enemy_id INTEGER,
    user_saves TEXT,
    enemy_saves TEXT,
    scores TEXT,
    time_left timestamp
);
-- Create foreign key to saved_games(user_id)-->user_account(id)--
ALTER TABLE ONLY saved_games ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_account(id) ON DELETE CASCADE;
-- Create foreign key to saved_games(enemy_id)-->user_account(id)--
ALTER TABLE ONLY saved_games ADD CONSTRAINT fk_enemy_id FOREIGN KEY (enemy_id) REFERENCES user_account(id) ON DELETE CASCADE;


