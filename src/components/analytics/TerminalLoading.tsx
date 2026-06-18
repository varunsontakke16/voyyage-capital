"use client";

export function TerminalLoading() {
  return (
    <div className="dark terminal-shell min-h-screen flex flex-col items-center justify-center gap-8 bg-background text-foreground font-sans antialiased">
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 rounded-full border-2 border-gold/20" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
        <span className="absolute inset-2 rounded-full bg-gold/10 animate-pulse" />
      </div>
      <div className="text-center">
        <div className="font-display text-2xl font-light tracking-tight text-gold animate-pulse">
          Voyyage
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Loading terminal
        </div>
      </div>
      <div className="flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-bounce" />
      </div>
    </div>
  );
}
