import { PageTitle } from "@/components/shared/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageTitle subTitle="Узнайте больше о нашем приложении для управления задачами.">
        О приложении "To-Do App Pro"
      </PageTitle>
      
      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Наша Миссия</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-3">
          <p>
            Это простое, но мощное приложение для управления списком дел (To-Do List) 
            разработано, чтобы помочь вам оставаться организованным и продуктивным.
            Мы стремились создать интуитивно понятный инструмент без лишних сложностей.
          </p>
          <p>
            Проект создан с использованием современных веб-технологий, включая Next.js 13+ (с App Router), 
            TypeScript для надежности кода, React Context API для управления состоянием задач, 
            и Tailwind CSS для создания чистого и адаптивного пользовательского интерфейса.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Ключевые Технологии</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><span className="font-semibold text-foreground">Next.js App Router:</span> Для маршрутизации и серверных компонентов.</li>
            <li><span className="font-semibold text-foreground">TypeScript:</span> Для статической типизации и предсказуемости.</li>
            <li><span className="font-semibold text-foreground">React Context API:</span> Для глобального управления задачами.</li>
            <li><span className="font-semibold text-foreground">Tailwind CSS:</span> Для быстрой и гибкой стилизации.</li>
            <li><span className="font-semibold text-foreground">localStorage:</span> Для локального сохранения задач (без бэкенда).</li>
            <li><span className="font-semibold text-foreground">Lucide React:</span> Для красивых и легковесных иконок.</li>
            <li><span className="font-semibold text-foreground">Адаптивный дизайн:</span> Приложение удобно использовать как на десктопе, так и на мобильных устройствах.</li>
          </ul>
        </CardContent>
      </Card>
       <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Функционал</CardTitle>
        </CardHeader>
        <CardContent>
           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Добавление новых задач.</li>
            <li>Просмотр списка всех задач.</li>
            <li>Редактирование существующих задач.</li>
            <li>Удаление задач.</li>
            <li>Отметка задач как выполненных/невыполненных.</li>
            <li>Сохранение задач между сессиями браузера.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}