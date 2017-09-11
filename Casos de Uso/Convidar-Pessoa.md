# Convidar Pessoa

## Objetivo
O sistema deve permitir que colaboradores da sala convidem usuários para sua sala através de email ou nome de usuário.

## Atores
Administrador, Moderador
## Pré-condições
Alunos ou Professores devem ter seu cargo mudado para moderador para realizar o convite.
## Fluxo principal
1. Inserir o e-mail da pessoa para solicitação do convite;
1. Confirmar o enviamento do convite; 
## Fluxos alternativos
1. Cancelar antes de enviar o convite;
## Fluxos de exceção
1. Caso o envio seja feito com a textbox vazia o sistema deve apresentar uma mensagem indicando que a caixa de email não pode ser vazio;
1. Caso o email seja maior que 64 caracteres, o sistema deve apresentar uma mensagem indicando que o comentário excedeu o limite de caracteres;
## Pós-condições
Uma mensagem deve aparecer ao usuario informando se o convite foi enviado ou não (caso haja uma exceção).
