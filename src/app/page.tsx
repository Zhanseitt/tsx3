export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-0rem)] p-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl mb-8">
        To-Do App
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground sm:text-xl mb-10">
        Организуйте свои дела стильно и эффективно. Начните добавлять задачи прямо сейчас!
      </p>
    </main>
  );
}