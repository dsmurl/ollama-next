# ollama-next

### Talk to it with a chat model

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="./public/app-promo-image-1.png" alt="Talk to it" width="400" />
</div>

### Ask it code questions with a code model

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="./public/app-promo-image-2.png" alt="Ask code questions" width="400" />
</div>

### install

- install the ollama cli
  - at 'https://ollama.com/download'
- get the llama3.2 model
  - `ollama pull llama3.2:latest`
- get the qwen2.5-coder:7b model
  - `ollama pull qwen2.5-coder:7b`
- run the ollama model server
  - `ollama serve`
- run the ollama-next model ui
  - `pnpm install`
  - `pnpm run dev`

### other useful commands

- `ollama ps`
- `ollama stop llama3.2`

### how it works

- you install and run the ollama server
- you pull the running model which the code desires
  - see src/server/trpc/router.ts where the model is ran and queried
  - there is a line which tells the server which model to use
- the ui is an interface to chat with the model
- it "remembers" the last 7 or so things you asked about to simulate memory
