// Cores e fontes da versão de computador.
// Tintim: GUIA.md, seção 8. WhatsApp Web: valores do tema escuro lidos do código público de web.whatsapp.com em 22/11/2026.
// Claude: cores medidas em imagem oficial da Anthropic (claude.com/blog/interactive-tools-in-claude).
export const C = { azul: "#1670CB", lima: "#E8F04F", navy: "#0A1C33", branco: "#FFFFFF", halftone: "#4A9BE8", whatsapp: "#25D366" };

export const WA = {
  fundo: "#161717", // --WDS-surface-default e papel de parede da conversa
  trilho: "#1D1F1F", // --WDS-surface-emphasized (barra de navegação)
  recebida: "#242626", // --WDS-systems-bubble-surface-incoming
  enviada: "#144D37", // --WDS-systems-bubble-surface-outgoing
  compositor: "#242626", // --WDS-systems-chat-surface-composer
  sistema: "#1D1F1F", // --WDS-systems-bubble-surface-system
  texto: "#FAFAFA", // --WDS-content-default
  cinza: "rgba(255,255,255,.6)", // --WDS-content-deemphasized
  linha: "rgba(255,255,255,.1)", // --WDS-lines-divider
  ativo: "rgba(255,255,255,.1)", // item ativo
  acento: "#21C063", // --WDS-accent
  lido: "#53BDEB", // tiques azuis
  pilulaAtiva: "#103529",
  pilulaAtivaTexto: "#D9FDD3",
};

export const CL = { fundo: "#FAF9F5", balao: "#F0EEE6", painel: "#F5F4ED", texto: "#141413", cinza: "#73726C", borda: "#DEDCD1", bordaFina: "rgba(31,30,29,.15)", coral: "#D97757" };

// Chrome no Mac, tema escuro (desenho por observação; não há código público da moldura do navegador).
export const CH = { moldura: "#1F2020", barra: "#3C3C3C", campo: "#282828", texto: "#E3E3E3", cinza: "#C4C7C5", fraco: "#9AA0A6" };

export const FONTE = "'Eudoxus Sans', sans-serif";
// O WhatsApp Web usa a fonte do sistema (classe .sf: system-ui, -apple-system, BlinkMacSystemFont). No Mac, é a SF Pro.
export const SISTEMA = "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Inter, sans-serif";
