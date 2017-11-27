--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE exercise (
    id integer NOT NULL,
    name character varying(255),
    difficulty smallint,
    reward integer,
    description text
);


ALTER TABLE exercise OWNER TO postgres;

--
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE exercise_id_seq OWNER TO postgres;

--
-- Name: exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE exercise_id_seq OWNED BY exercise.id;


--
-- Name: exercise id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise ALTER COLUMN id SET DEFAULT nextval('exercise_id_seq'::regclass);


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY exercise (id, name, difficulty, reward, description) FROM stdin;
1	Sequência de Fibonacci	2	30	Lorem ipsum dolor sit amet consectetur adipiscing elit
2	Sequência de Primos	1	20	Dado um número inteiro n, o algoritmo deve apresentar como saída todos os números inteiros de 2 até n, incluindo o próprio.
3	Fatorial	2	40	Dado um número inteiro n, o algoritmo deve apresentar como saída o fatorial do mesmo (n!). O valor de n nunca será maior que 12. O algoritmo pode ser tanto iterativo quanto recursivo.
\.


--
-- Name: exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('exercise_id_seq', 3, true);


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

