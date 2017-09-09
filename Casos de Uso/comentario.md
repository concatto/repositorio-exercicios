# Comentário

## Objetivo
Permitir que usuários que tenham completado um exercício comentem sobre as soluções de outros alunos e respondam a outros comentários.

## Atores
Usuário
## Pré-condições
Se o ator for um aluno, o mesmo deve ter resolvido o exercício previamente.
## Fluxo principal
1. Acessar a página de soluções do exercício em questão;
1. Acessar alguma das soluções listadas;
1. Inserir o comentário desejado na caixa de texto localizada no topo dos comentários;
1. Confirmar a publicação do comentário.
## Fluxos alternativos
No passo 3, caso o usuário queira responder a um comentário:
1. Clicar no ícone "Responder" de algum dos comentários;
1. Inserir o comentário desejado na caixa de texto localizada abaixo do comentário a ser respondido;
1. Retornar ao passo 4.
## Fluxos de exceção
No passo 4, caso o comentário possua 0 caracteres (vazio):
1. Apresentar uma mensagem indicando que o comentário não pode ser vazio;
1. Retornar ao passo anterior no respectivo fluxo.

No passo 4, caso o comentário possua mais de 512:
1. Apresentar uma mensagem indicando que o comentário excedeu o limite de caracteres;
1. Retornar ao passo anterior no respectivo fluxo.
## Pós-condições
O comentário do usuário deverá ser exibido na página de comentários do exercício. Caso seja uma resposta, o comentário deverá estar localizado abaixo do comentário respondido.
