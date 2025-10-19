import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const pets = [
  {
    id: 1,
    name: 'Макс',
    type: 'Собака',
    breed: 'Золотистый ретривер',
    age: '2 года',
    description: 'Дружелюбный и активный пёс, обожает играть и гулять. Отлично ладит с детьми.',
    image: 'https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/87fc32c6-a399-432c-b6c7-a6f86626700b.jpg'
  },
  {
    id: 2,
    name: 'Рыжик',
    type: 'Кошка',
    breed: 'Рыжий табби',
    age: '1 год',
    description: 'Игривый котёнок с ярким характером. Любит внимание и ласку.',
    image: 'https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/b137df31-139e-4e22-a433-e29d969e96f8.jpg'
  },
  {
    id: 3,
    name: 'Снежок',
    type: 'Кролик',
    breed: 'Декоративный',
    age: '6 месяцев',
    description: 'Милый и спокойный кролик. Идеален для квартиры и семьи с детьми.',
    image: 'https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/81ffe7bd-b42c-4aab-9038-41e0f9d7ca92.jpg'
  }
];

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Heart" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">Счастливые Лапки</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#pets" className="text-foreground hover:text-primary transition-colors font-medium">
                Питомцы
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                О нас
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Контакты
              </a>
            </div>
            <Button className="hidden md:inline-flex">
              <Icon name="Phone" size={18} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Подарите любовь <br />
            <span className="text-primary">пушистому другу</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Наш питомник помогает животным найти любящий дом. Каждый питомец заслуживает счастливой жизни с заботливой семьёй.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg">
              <Icon name="PawPrint" size={20} className="mr-2" />
              Найти питомца
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              <Icon name="Heart" size={20} className="mr-2" />
              Помочь приюту
            </Button>
          </div>
        </div>
      </section>

      <section id="pets" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши питомцы</h2>
            <p className="text-lg text-muted-foreground">Познакомьтесь с нашими друзьями, которые ищут дом</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet, index) => (
              <Card 
                key={pet.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={pet.image} 
                    alt={pet.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {pet.type}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="PawPrint" size={24} className="text-primary" />
                    {pet.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {pet.breed} • {pet.age}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{pet.description}</p>
                  <Button className="w-full" size="lg">
                    <Icon name="Heart" size={18} className="mr-2" />
                    Забрать домой
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">О нашем питомнике</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Профессионалы</h3>
                <p className="text-muted-foreground">Опытные ветеринары и кинологи заботятся о каждом питомце</p>
              </Card>
              
              <Card className="text-center p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Home" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Уютные условия</h3>
                <p className="text-muted-foreground">Современные помещения с комфортными условиями проживания</p>
              </Card>
              
              <Card className="text-center p-6 border-2 hover:shadow-lg transition-shadow">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">С любовью</h3>
                <p className="text-muted-foreground">Каждое животное окружено заботой и вниманием</p>
              </Card>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2">
              <h3 className="text-2xl font-bold mb-4">Наша миссия</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Мы создали питомник "Счастливые Лапки", чтобы помочь бездомным животным обрести любящую семью. 
                Каждый день мы заботимся о наших подопечных, обеспечиваем им ветеринарный уход, правильное питание 
                и готовим к встрече с новыми хозяевами.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Наша команда состоит из профессионалов, которые искренне любят животных. Мы верим, что каждый 
                питомец заслуживает счастливой жизни, и делаем всё возможное, чтобы найти для них идеальный дом.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Свяжитесь с нами</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Адрес</h4>
                      <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Icon name="Phone" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Телефон</h4>
                      <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Icon name="Mail" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">info@happypaws.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="Clock" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Часы работы</h4>
                      <p className="text-muted-foreground">Пн-Вс: 10:00 - 19:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Отправить сообщение</CardTitle>
                  <CardDescription>Мы ответим в течение 24 часов</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input 
                        placeholder="Ваше имя" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        type="tel" 
                        placeholder="Телефон" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Ваше сообщение" 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Heart" size={32} className="text-primary" />
            <h3 className="text-2xl font-bold">Счастливые Лапки</h3>
          </div>
          <p className="text-background/70 mb-4">Помогаем животным найти дом с 2020 года</p>
          <div className="flex gap-4 justify-center">
            <Button variant="ghost" size="icon" className="text-background hover:text-primary">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-background hover:text-primary">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-background hover:text-primary">
              <Icon name="Youtube" size={20} />
            </Button>
          </div>
          <p className="text-background/50 mt-8 text-sm">© 2024 Счастливые Лапки. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
