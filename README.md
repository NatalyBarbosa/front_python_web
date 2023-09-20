# Começando com o Redux 4.2.0

Redux é um contêiner de estado previsível para aplicativos JavaScript e Typescript.
Você pode usar o Redux junto com o React ou com qualquer outra biblioteca de visualização. É minúsculo (2kB, incluindo dependências), mas possui um grande ecossistema de complementos disponíveis.

# Installation

O Redux Toolkit é nossa abordagem oficial recomendada para escrever a lógica Redux. Ele envolve o núcleo Redux e contém pacotes e funções que consideramos essenciais para construir um aplicativo Redux. O Redux Toolkit se baseia em nossas práticas recomendadas sugeridas, simplifica a maioria das tarefas do Redux, evita erros comuns e facilita a criação de aplicativos Redux.

# Create a React Redux App

A maneira recomendada de iniciar novos aplicativos com React e Redux é usando o modelo oficial Redux+JS ou o modelo Redux+TS para Create React App , que aproveita a integração do Redux Toolkit e do React Redux com componentes React.

# Redux + Plain JS template


        npx create-react-app my-app --template redux

        

# Redux + TypeScript template


        npx create-react-app my-app --template redux-typescript



# Redux Core

A biblioteca principal do Redux está disponível como um pacote no NPM para uso com um empacotador de módulos ou em um aplicativo Node:

# NPM

        npm install redux


# Yarn

        yarn add redux