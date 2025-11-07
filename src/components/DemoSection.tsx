const DemoSection = () => {
  return (
    <section id="demo" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Veja Como Funciona
          </h2>
          <p className="text-xl text-muted-foreground">
            Descubra como nossa IA analisa seus exercícios em segundos
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="aspect-video bg-gradient-secondary rounded-2xl shadow-elegant overflow-hidden border border-border/50">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-10" />
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <svg 
                    className="w-10 h-10 text-primary-foreground" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-2xl font-semibold text-foreground mb-2">
                  Vídeo de Demonstração
                </p>
                <p className="text-muted-foreground">
                  Tutorial completo sobre como usar a plataforma
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50 shadow-card">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Grave seu Exercício</h3>
              <p className="text-sm text-muted-foreground">
                Filme sua execução de perfil com boa iluminação
              </p>
            </div>

            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50 shadow-card">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Envie para Análise</h3>
              <p className="text-sm text-muted-foreground">
                Faça upload e selecione o tipo de exercício
              </p>
            </div>

            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50 shadow-card">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Receba Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Análise detalhada em segundos com pontos de melhoria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoSection
