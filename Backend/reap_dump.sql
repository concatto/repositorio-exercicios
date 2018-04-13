--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

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
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    room_id integer NOT NULL
);


ALTER TABLE category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE category_id_seq OWNED BY category.id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE comment (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    commenter_id integer NOT NULL,
    solution_id integer NOT NULL,
    in_response_to integer
);


ALTER TABLE comment OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comment_id_seq OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE comment_id_seq OWNED BY comment.id;


--
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE exercise (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    difficulty smallint NOT NULL,
    base_reward integer NOT NULL,
    description text NOT NULL,
    room_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    visible boolean DEFAULT false NOT NULL,
    creator_id integer
);


ALTER TABLE exercise OWNER TO postgres;

--
-- Name: exercise_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE exercise_category (
    exercise_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE exercise_category OWNER TO postgres;

--
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE exercise_id_seq
    AS integer
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
-- Name: language; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE language (
    id integer NOT NULL,
    name character varying(64) NOT NULL
);


ALTER TABLE language OWNER TO postgres;

--
-- Name: language_availability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE language_availability (
    exercise_id integer NOT NULL,
    language_id integer NOT NULL
);


ALTER TABLE language_availability OWNER TO postgres;

--
-- Name: language_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE language_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE language_id_seq OWNER TO postgres;

--
-- Name: language_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE language_id_seq OWNED BY language.id;


--
-- Name: reap_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reap_user (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(32) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(64) NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    registered_at timestamp without time zone DEFAULT now()
);


ALTER TABLE reap_user OWNER TO postgres;

--
-- Name: reap_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE reap_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reap_user_id_seq OWNER TO postgres;

--
-- Name: reap_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE reap_user_id_seq OWNED BY reap_user.id;


--
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE room (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    creator_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE room OWNER TO postgres;

--
-- Name: room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE room_id_seq OWNER TO postgres;

--
-- Name: room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE room_id_seq OWNED BY room.id;


--
-- Name: user_room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_room (
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    experience bigint DEFAULT 0 NOT NULL,
    privilege smallint DEFAULT 3 NOT NULL,
    joined_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE user_room OWNER TO postgres;

--
-- Name: room_stats; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW room_stats AS
 SELECT count(user_room.user_id) AS user_count,
    user_room.room_id
   FROM user_room
  GROUP BY user_room.room_id;


ALTER TABLE room_stats OWNER TO postgres;

--
-- Name: solution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE solution (
    id integer NOT NULL,
    code text NOT NULL,
    language_id integer NOT NULL,
    exercise_id integer NOT NULL,
    creator_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    modified_at timestamp without time zone DEFAULT now() NOT NULL,
    accepted boolean NOT NULL
);


ALTER TABLE solution OWNER TO postgres;

--
-- Name: solution_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE solution_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE solution_id_seq OWNER TO postgres;

--
-- Name: solution_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE solution_id_seq OWNED BY solution.id;


--
-- Name: solution_rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE solution_rating (
    solution_id integer NOT NULL,
    rater_id integer NOT NULL,
    positive boolean NOT NULL
);


ALTER TABLE solution_rating OWNER TO postgres;

--
-- Name: solution_tip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE solution_tip (
    tip_id integer NOT NULL,
    solution_id integer NOT NULL
);


ALTER TABLE solution_tip OWNER TO postgres;

--
-- Name: test_case; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE test_case (
    id integer NOT NULL,
    exercise_id integer NOT NULL,
    input text NOT NULL,
    output text NOT NULL
);


ALTER TABLE test_case OWNER TO postgres;

--
-- Name: test_case_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE test_case_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test_case_id_seq OWNER TO postgres;

--
-- Name: test_case_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE test_case_id_seq OWNED BY test_case.id;


--
-- Name: tip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tip (
    id integer NOT NULL,
    content text NOT NULL,
    exercise_id integer NOT NULL,
    penalty integer NOT NULL
);


ALTER TABLE tip OWNER TO postgres;

--
-- Name: tip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tip_id_seq OWNER TO postgres;

--
-- Name: tip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tip_id_seq OWNED BY tip.id;


--
-- Name: user_relationship; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_relationship (
    follower_id integer NOT NULL,
    following_id integer NOT NULL
);


ALTER TABLE user_relationship OWNER TO postgres;

--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN id SET DEFAULT nextval('category_id_seq'::regclass);


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment ALTER COLUMN id SET DEFAULT nextval('comment_id_seq'::regclass);


--
-- Name: exercise id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise ALTER COLUMN id SET DEFAULT nextval('exercise_id_seq'::regclass);


--
-- Name: language id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY language ALTER COLUMN id SET DEFAULT nextval('language_id_seq'::regclass);


--
-- Name: reap_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reap_user ALTER COLUMN id SET DEFAULT nextval('reap_user_id_seq'::regclass);


--
-- Name: room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room ALTER COLUMN id SET DEFAULT nextval('room_id_seq'::regclass);


--
-- Name: solution id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution ALTER COLUMN id SET DEFAULT nextval('solution_id_seq'::regclass);


--
-- Name: test_case id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY test_case ALTER COLUMN id SET DEFAULT nextval('test_case_id_seq'::regclass);


--
-- Name: tip id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tip ALTER COLUMN id SET DEFAULT nextval('tip_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY category (id, name, room_id) FROM stdin;
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY comment (id, created_at, content, commenter_id, solution_id, in_response_to) FROM stdin;
\.


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY exercise (id, name, difficulty, base_reward, description, room_id, created_at, visible, creator_id) FROM stdin;
2	Teste	999	20	Testando	9	2017-11-26 12:33:55.055035	f	2
3	Teste2	999	9999	Testando2	9	2017-11-26 14:08:52.376093	f	2
4	Returns	999	9999	Testando2	9	2017-11-26 14:10:24.49879	f	2
5	Cats	999	9999	Testando2	9	2017-11-26 15:00:37.374383	f	2
13	Cats returning	999	9999	Testando2	9	2017-11-26 15:08:45.527904	f	2
14	Test privilege	999	9999	Testando2	9	2017-11-27 10:01:36.905554	t	2
15	Exercício de teste	3	666	Lorem ipsum dolor sit amet	12	2017-12-04 11:24:00.3803	f	2
\.


--
-- Data for Name: exercise_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY exercise_category (exercise_id, category_id) FROM stdin;
\.


--
-- Data for Name: language; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY language (id, name) FROM stdin;
\.


--
-- Data for Name: language_availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY language_availability (exercise_id, language_id) FROM stdin;
\.


--
-- Data for Name: reap_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY reap_user (id, name, username, email, password, verified, registered_at) FROM stdin;
2	Fernando Concatto	concatto	fernandoconcatto@gmail.com	$2a$10$BTlqc9isgSLCKIW5TZ8bGuZgdsAu4AdwPbLjs3QGkHK56wog7Xame	t	2017-11-30 08:57:09.222112
7	William Gosset	student	test@test.com	$2a$10$0o7R/85OxgT3E3dfdD.0ZuPEaiDr9zyUbxnC.xG4l94lFf4pLLRze	t	2017-11-30 08:57:09.222112
11	Unregistered User	unregist	unregistered@reg.com	$2a$10$deIjhhq7x/LsbysJ.BHBRePXFzHmcZERgzQljXLQihOYUdxrCarK2	t	2017-11-30 08:57:09.222112
13	Time Keeper	time	nandoconcatto@gmail.com	$2a$10$R5eS0Bvl3kFCO1YOqe/og.MulqFVD6nHqoB7Vqcxx87OmnFp6sbqW	t	2017-11-30 09:17:41.030944
14	Teste	test	abc@abc.com	$2a$10$n6ruFt9vfeFcplHKpDlFE.duICxteeS/rng5dSNYuQpqal3ZGvBd6	f	2017-12-04 10:58:18.093421
15	asd	asd	asd@asd.com	$2a$10$G.ZOUzPA26oAPLvIxvQsjOsPgMfIC/2f0ifqBQe4BjGGpjhPxTI0e	f	2017-12-04 11:00:41.408398
16	dsa	aaa	dsa@dsa.com	$2a$10$7chmXggMMz4LL/DVICo1eejn1kpv1PsMudUPPtViJQpwa5SgRQ41e	f	2017-12-04 11:01:21.53816
17	qwdhqiwdhqw	teste	abcde@a.com	$2a$10$dj3IiU.GxMl2gyH9qpNyCuKJCAzzDlJJVe3dr..kFnl9bxqBIFEz2	t	2017-12-04 11:09:57.504499
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY room (id, name, creator_id, created_at) FROM stdin;
9	UNIVALI	2	2017-11-22 10:32:27.609398
12	LIA	2	2017-12-04 11:19:18.367135
\.


--
-- Data for Name: solution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY solution (id, code, language_id, exercise_id, creator_id, created_at, modified_at, accepted) FROM stdin;
\.


--
-- Data for Name: solution_rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY solution_rating (solution_id, rater_id, positive) FROM stdin;
\.


--
-- Data for Name: solution_tip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY solution_tip (tip_id, solution_id) FROM stdin;
\.


--
-- Data for Name: test_case; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY test_case (id, exercise_id, input, output) FROM stdin;
1	13	An input	An output
2	14	An input	An output
\.


--
-- Data for Name: tip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tip (id, content, exercise_id, penalty) FROM stdin;
\.


--
-- Data for Name: user_relationship; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_relationship (follower_id, following_id) FROM stdin;
\.


--
-- Data for Name: user_room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_room (room_id, user_id, experience, privilege, joined_at) FROM stdin;
9	2	0	0	2017-11-22 10:32:27.609398
9	7	0	3	2017-11-26 13:38:21.923344
12	2	0	0	2017-12-04 11:19:18.367135
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_id_seq', 1, false);


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('comment_id_seq', 1, false);


--
-- Name: exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('exercise_id_seq', 15, true);


--
-- Name: language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('language_id_seq', 1, false);


--
-- Name: reap_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('reap_user_id_seq', 17, true);


--
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('room_id_seq', 12, true);


--
-- Name: solution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('solution_id_seq', 1, false);


--
-- Name: test_case_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('test_case_id_seq', 2, true);


--
-- Name: tip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tip_id_seq', 1, false);


--
-- Name: category category_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- Name: comment comment_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pk PRIMARY KEY (id);


--
-- Name: exercise_category exercise_category_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise_category
    ADD CONSTRAINT exercise_category_pk PRIMARY KEY (exercise_id, category_id);


--
-- Name: exercise exercise_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise
    ADD CONSTRAINT exercise_pk PRIMARY KEY (id);


--
-- Name: language_availability language_availability_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY language_availability
    ADD CONSTRAINT language_availability_pk PRIMARY KEY (exercise_id, language_id);


--
-- Name: language language_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY language
    ADD CONSTRAINT language_pk PRIMARY KEY (id);


--
-- Name: reap_user reap_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reap_user
    ADD CONSTRAINT reap_user_email_key UNIQUE (email);


--
-- Name: reap_user reap_user_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reap_user
    ADD CONSTRAINT reap_user_pk PRIMARY KEY (id);


--
-- Name: reap_user reap_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reap_user
    ADD CONSTRAINT reap_user_username_key UNIQUE (username);


--
-- Name: room room_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room
    ADD CONSTRAINT room_pk PRIMARY KEY (id);


--
-- Name: solution solution_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution
    ADD CONSTRAINT solution_pk PRIMARY KEY (id);


--
-- Name: solution_rating solution_rating_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution_rating
    ADD CONSTRAINT solution_rating_pk PRIMARY KEY (solution_id, rater_id);


--
-- Name: solution_tip solution_tip_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution_tip
    ADD CONSTRAINT solution_tip_pk PRIMARY KEY (tip_id, solution_id);


--
-- Name: test_case test_case_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY test_case
    ADD CONSTRAINT test_case_pk PRIMARY KEY (id);


--
-- Name: tip tip_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tip
    ADD CONSTRAINT tip_pk PRIMARY KEY (id);


--
-- Name: user_relationship user_relationship_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_relationship
    ADD CONSTRAINT user_relationship_pk PRIMARY KEY (follower_id, following_id);


--
-- Name: user_room user_room_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_room
    ADD CONSTRAINT user_room_pk PRIMARY KEY (room_id, user_id);


--
-- Name: category category_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_room FOREIGN KEY (room_id) REFERENCES room(id);


--
-- Name: comment comment_comment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_comment FOREIGN KEY (in_response_to) REFERENCES comment(id);


--
-- Name: comment comment_solution; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_solution FOREIGN KEY (solution_id) REFERENCES solution(id);


--
-- Name: comment comment_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_user FOREIGN KEY (commenter_id) REFERENCES reap_user(id);


--
-- Name: exercise_category exercise_category_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise_category
    ADD CONSTRAINT exercise_category_category FOREIGN KEY (category_id) REFERENCES category(id);


--
-- Name: exercise_category exercise_category_exercise; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise_category
    ADD CONSTRAINT exercise_category_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id);


--
-- Name: exercise exercise_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise
    ADD CONSTRAINT exercise_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES reap_user(id);


--
-- Name: exercise exercise_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY exercise
    ADD CONSTRAINT exercise_room FOREIGN KEY (room_id) REFERENCES room(id);


--
-- Name: language_availability language_availability_exercise; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY language_availability
    ADD CONSTRAINT language_availability_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id);


--
-- Name: language_availability language_availability_language; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY language_availability
    ADD CONSTRAINT language_availability_language FOREIGN KEY (language_id) REFERENCES language(id);


--
-- Name: room room_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room
    ADD CONSTRAINT room_user FOREIGN KEY (creator_id) REFERENCES reap_user(id);


--
-- Name: solution solution_exercise; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution
    ADD CONSTRAINT solution_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id);


--
-- Name: solution solution_language; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution
    ADD CONSTRAINT solution_language FOREIGN KEY (language_id) REFERENCES language(id);


--
-- Name: solution_rating solution_rating_solution; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution_rating
    ADD CONSTRAINT solution_rating_solution FOREIGN KEY (solution_id) REFERENCES solution(id);


--
-- Name: solution_rating solution_rating_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution_rating
    ADD CONSTRAINT solution_rating_user FOREIGN KEY (rater_id) REFERENCES reap_user(id);


--
-- Name: solution_tip solution_tip_solution; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution_tip
    ADD CONSTRAINT solution_tip_solution FOREIGN KEY (solution_id) REFERENCES solution(id);


--
-- Name: solution_tip solution_tip_tip; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution_tip
    ADD CONSTRAINT solution_tip_tip FOREIGN KEY (tip_id) REFERENCES tip(id);


--
-- Name: solution solution_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY solution
    ADD CONSTRAINT solution_user FOREIGN KEY (creator_id) REFERENCES reap_user(id);


--
-- Name: test_case test_case_exercise; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY test_case
    ADD CONSTRAINT test_case_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id);


--
-- Name: tip tip_exercise; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tip
    ADD CONSTRAINT tip_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id);


--
-- Name: user_relationship user_relationship_user_follower; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_relationship
    ADD CONSTRAINT user_relationship_user_follower FOREIGN KEY (following_id) REFERENCES reap_user(id);


--
-- Name: user_relationship user_relationship_user_following; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_relationship
    ADD CONSTRAINT user_relationship_user_following FOREIGN KEY (follower_id) REFERENCES reap_user(id);


--
-- Name: user_room user_room_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_room
    ADD CONSTRAINT user_room_room FOREIGN KEY (room_id) REFERENCES room(id);


--
-- Name: user_room user_room_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_room
    ADD CONSTRAINT user_room_user FOREIGN KEY (user_id) REFERENCES reap_user(id);

	
-- *** >===< *** >===< *** TEST DATA *** >===< *** >===< *** --

INSERT INTO reap_user(id, name, username, email, password, verified)
	VALUES (1001, 'REAP', 'reap', 'test@test.test', '$2a$10$y9N3cJ/tDngQFwuwskm7f./5Y8mFOp4W0d.eOBUMgF8pcrP/0qDt.', true);
	
INSERT INTO language(id, name) VALUES (1, 'C++');
INSERT INTO language(id, name) VALUES (2, 'C');
INSERT INTO category(id, name, room_id) VALUES (1, 'Matematica', 9);
INSERT INTO category(id, name, room_id) VALUES (2, 'Vetores', 9);

--Exercicio 1

INSERT INTO exercise(id, name, difficulty, base_reward, description, room_id, created_at, visible, creator_id)
			 VALUES (1001, 'Fatorial', 2, 10, 'Crie uma função que receba um número inteiro menor que 100, e retorne como resultado o seu fatorial!', 9, localtimestamp, true, 1001);	
INSERT INTO exercise_category(exercise_id, category_id) VALUES (1001, 1);
INSERT INTO language_availability(exercise_id, language_id) VALUES (1001, 1);
INSERT INTO language_availability(exercise_id, language_id) VALUES (1001, 2);
INSERT INTO tip(id, content, exercise_id, penalty) VALUES (1, 'Exemplo: 5! == 1x2x3x4x5 = 120', 1001, 3);
INSERT INTO tip(id, content, exercise_id, penalty) VALUES (2, 'Fórmula matemática do fatorial: n(n-1)', 1001, 4);
INSERT INTO test_case(id, exercise_id, input, output) VALUES (100, 1001, '5', '120');
INSERT INTO test_case(id, exercise_id, input, output) VALUES (101, 1001, '6', '720');
INSERT INTO test_case(id, exercise_id, input, output) VALUES (102, 1001, '7', '5040');
INSERT INTO test_case(id, exercise_id, input, output) VALUES (103, 1001, '8', '40320');

--Exercicio 2
	
INSERT INTO exercise(id, name, difficulty, base_reward, description, room_id, created_at, visible, creator_id)
			 VALUES (1002, 'Soma de Vetor', 2, 5, 'Crie uma função que receba um vetor e retone a soma de todos os elementos do mesmo!', 9, localtimestamp, true, 1001);	
INSERT INTO exercise_category(exercise_id, category_id) VALUES (1002, 2);
INSERT INTO language_availability(exercise_id, language_id) VALUES (1002, 1);
INSERT INTO language_availability(exercise_id, language_id) VALUES (1002, 2);
INSERT INTO tip(id, content, exercise_id, penalty) VALUES (3, 'Exemplo: input: int vet[5]={0,1,2,3,4}, output: 10', 1002, 1);
INSERT INTO tip(id, content, exercise_id, penalty) VALUES (4, 'Pode ser declarado um laço de repeticao para percorrer o vetor ate n-1, exemplo for(int x=0;x<vet.length-1;x++)', 1002, 3);
INSERT INTO test_case(id, exercise_id, input, output) VALUES (104, 1002, 'vet[5]={0,1,2,3,4}', '10');
INSERT INTO test_case(id, exercise_id, input, output) VALUES (105, 1002, 'vet[3]={2,3,5}', '10');
INSERT INTO test_case(id, exercise_id, input, output) VALUES (106, 1002, 'vet[2]={8,1}', '9');
INSERT INTO test_case(id, exercise_id, input, output) VALUES (107, 1002, 'vet[5]={2,2,2,2,2}', '10');

-- *** >===< *** >===< *** END TEST DATA *** >===< *** >===< *** --

--
-- PostgreSQL database dump complete
--

