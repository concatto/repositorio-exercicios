<h1> Regras de Negócio </h1>

* Para realizar a submissão de uma solução, o usuário deve previamente submetê-la a
uma verificação sintática e semântica, e deve obter êxito neste processo.
* Para ser aceita como correta, uma solução deve obter sucesso em todos os casos de
teste cadastrados (tanto no cadastro do exercício quanto na submissão pelo estudante).
* Para acessar qualquer parte do sistema que não seja a interface de login, o usuário
deve estar autenticado.
* Ao cadastrar uma conta, o usuário deve obrigatoriamente informar seu e-mail, nome,
identificador de conta, senha e confirmação de senha.
* Ao criar uma sala, o usuário deve obrigatoriamente informar o nome da sala, com no
máximo 255 caracteres.
* Ao criar uma sala, o usuário poderá informar zero ou mais e-mails e cargos, indicando
os membros iniciais da sala.
* Usuários só poderão alterar o cargo ou remover membros que estiverem em um nível
de permissão abaixo do seu.
* Ao cadastrar um exercício, o colaborador deve obrigatoriamente informar seu título,
enunciado, uma ou mais categorias e no mínimo um caso de teste.
* A dificuldade dos exercícios deverá estar entre 1 e 5 (inclusivo).
* A dificuldade padrão na criação do exercício será 1.
* Um exercício deverá ter de zero a dez dicas.
* Um exercício deverá recompensar de 1 a 999 pontos.
* Um exercício deverá ter no mínimo uma solução de referência.
* Um exercício deverá ter no mínimo um caso de teste.
* Um exercício poderá ser editado, excluído ou tornado invisível somente se nenhum
usuário tentou resolvê-lo.
* O criador do exercício deverá especificar a penalidade em pontos para cada dica do
exercício.
* Um usuário poderá resolver um exercício mesmo se já tiver resolvido o mesmo
anteriormente, porém não receberá nenhum ponto adicional.
* O usuário deverá escolher de uma lista predeterminada de linguagens a linguagem
para desenvolver a solução.
* Os programas submetidos pelos usuários deverão ser compilados por compiladores
padrões de cada linguagem.
* Programas de usuários deverão ser limitados tanto em tempo de execução quanto em
consumo de memória ao serem executados pelo servidor que hospeda o sistema.
Também deverão ser executados com o menor nível de privilégio possível.
* Usuários deverão ser associados a um nível, que varia de 1 a 99.
* O nível de um usuário deverá ser aumentado quando a quantidade de pontos
adquiridos por ele exceder o limite do nível atual.
* Ao atingir o nível 99, o usuário não receberá níveis adicionais, mas a quantidade de
pontos em seu perfil deverá continuar sendo incrementada normalmente.
