# Resolver Exercícios

## Objetivo
* Permitir que usuários que já participam de alguma sala resolva um exercício previamente já publicado em sala.

## Atores
1. Usuários
2. Sistema

## Pré-condições
1. O usuário deve estar devidamente cadastrado e logado no sistema.
2. O usuário deve estar devidamente acessado alguma sala que participa.
3. O usuário deve ter devidamente acessado um exercício disponível na lista da sala para responder.

## Fluxo principal
1. O sistema apresenta os detalhes do exercício.
2. O usuário deve desenvolver sua solução na IDE da página.
3. O usuário deve submeter a sua solução.
4. O sistema analisa a solução.
5. O sistema registra a solução como correta, acrescenta a pontução do exercício e visualiza as soluções disponíveis do exercicío.
6. Retorna a lista de exercícios.

## Fluxos alternativos
* No passo 4, caso a solução do usuário esteja incorreta:
7. Se houver dicas, o sistema oferece as dicas, caso nao houver mais dicas volta ao passo 2 do fluxo principal.
8. Se aceitar, reduz a pontução do exercício e visualiza a dica.
9. Retorna ao passo 2 do fluxo principal.

* No passo 2, caso tenha dicas disponveis e o usuário queira visualizar:
7. O usuário solicita uma dica
8. O sistema deixa visível a dica e decrementa a pontuação da dica do total do exercício.
9. Retorna ao passo 2 do fluxo principal.

## Fluxos de exceção

* No passo 3, caso a solução submetida esteja vazia:
10. O sistema notifica o usuário com uma mensagem.
11. Retorna ao passo 2 do fluxo principal.

## Pós-condições
* O exercício respondido deve constar na lista como respondido e sua pontuação deve ter sido acrescentada a do usuário.

## Rastreabilidade
* RF 12, RF 27, RF 28, RF 29, RF 30, RF 31, RF 32, RF 33, RF 34, RF 35.
