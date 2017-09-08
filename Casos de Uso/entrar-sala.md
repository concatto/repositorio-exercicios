# ID: 4

## Objetivo: 
Permitir que usuários convidados possam entrar na sala e ter acesso aos exercícios através de convites via e-mail.

## Pré-Condições
1. O usuário deve ter recebido convite via e-mail.
1. O usuário deve estar cadastrado e ter feito login em sua conta.
1. O link do convite para entrar na sala deve estar válido, sendo permitido somente 1 usuário por link.

## Pós-Condições
1. Após validar o convite da sala, o sistema deve permitir que o usuário possa entrar na sala sem precisar ser convidado novamente.
1. Após validar o convite da sala, o sistema deve apresentar ao usuário os exercícios disponíveis para resolver e os demais alunos/professores da sala.

## Atores
1. Usuários em geral.

## Fluxo Principal 
1. O usuário recebe um link em seu e-mail.
1. Ao acessar o link, o usuário será levado à página de acesso à conta, onde poderá cadastrar-se ou, se já estiver cadastrado, acessar a conta.
1. Ao completar o login, o usuário terá então acesso à sala, podendo ver os demais alunos e professores e os exercícios disponíveis.

## Fluxo Alternativo
1. O usuário não estar cadastrado no sistema, assim, será necessário cadastrar-se antes de entar na sala.
1. O link de convite estar inválido, assim o usuário deverá solicitar ao criador da sala/moderador um novo link.


