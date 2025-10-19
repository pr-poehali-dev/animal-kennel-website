import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [dogs, setDogs] = useState([]);
  const [litters, setLitters] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [dogsData, littersData, galleryData] = await Promise.all([
        api.getDogs(),
        api.getLitters(),
        api.getGallery()
      ]);
      setDogs(dogsData.dogs || []);
      setLitters(littersData.litters || []);
      setGallery(galleryData.photos || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.sendMessage(formData);
      alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert('Ошибка отправки сообщения. Попробуйте позже.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-md shadow-md z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Icon name="Dog" className="text-primary" size={36} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Питомник "Империал"</h1>
                <p className="text-xs text-muted-foreground">Немецкие овчарки</p>
              </div>
            </div>
            <div className="hidden lg:flex gap-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                О питомнике
              </a>
              <a href="#dogs" className="text-foreground hover:text-primary transition-colors font-medium">
                Производители
              </a>
              <a href="#puppies" className="text-foreground hover:text-primary transition-colors font-medium">
                Щенки
              </a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors font-medium">
                Галерея
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Контакты
              </a>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <Button variant="outline" onClick={() => navigate('/admin')}>
                  <Icon name="Settings" size={18} className="mr-2" />
                  Админка
                </Button>
              )}
              <Button className="hidden md:inline-flex">
                <Icon name="Phone" size={18} className="mr-2" />
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 text-sm">Питомник немецких овчарок</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                Питомник<br />
                <span className="text-primary">Империал</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Профессиональное разведение немецких овчарок с 2010 года. Чемпионы России и Европы, 
                щенки шоу и рабочего класса с документами РКФ-FCI.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" className="text-lg">
                  <Icon name="PawPrint" size={20} className="mr-2" />
                  Смотреть щенков
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Icon name="Trophy" size={20} className="mr-2" />
                  Наши достижения
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/87fc32c6-a399-432c-b6c7-a6f86626700b.jpg"
                  alt="Немецкая овчарка"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">О питомнике</h2>
              <p className="text-lg text-muted-foreground">Профессиональное разведение с 2010 года</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center p-6 border-2">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">15+</h3>
                <p className="text-sm text-muted-foreground">Чемпионов выведено</p>
              </Card>

              <Card className="text-center p-6 border-2">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-secondary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">200+</h3>
                <p className="text-sm text-muted-foreground">Счастливых владельцев</p>
              </Card>

              <Card className="text-center p-6 border-2">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Trophy" size={32} className="text-accent" />
                </div>
                <h3 className="text-3xl font-bold mb-1">50+</h3>
                <p className="text-sm text-muted-foreground">Наград на выставках</p>
              </Card>

              <Card className="text-center p-6 border-2">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">14</h3>
                <p className="text-sm text-muted-foreground">Лет опыта</p>
              </Card>
            </div>

            <Card className="p-8 border-2">
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold mb-4">Наша философия</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Питомник "Империал" специализируется на разведении немецких овчарок высшего класса. 
                  Мы работаем с лучшими европейскими линиями и уделяем особое внимание здоровью, 
                  экстерьеру и рабочим качествам наших собак.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Все наши производители имеют титулы Чемпионов России и Европы, проверены по здоровью 
                  (дисплазия HD/ED, генетические тесты), обладают уравновешенным характером и отличными 
                  рабочими качествами.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Каждый щенок из нашего питомника получает документы РКФ-FCI, ветеринарный паспорт с прививками, 
                  клеймо, консультации по выращиванию и поддержку на всю жизнь. Мы помогаем с выставочной 
                  карьерой и дрессировкой.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="dogs" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши производители</h2>
            <p className="text-lg text-muted-foreground">Чемпионы России и Европы с проверенной родословной</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {dogs.map((dog, index) => (
              <Card 
                key={dog.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={dog.image_url}
                    alt={dog.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground text-sm font-semibold">
                      {dog.gender}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl mb-2">{dog.name}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {dog.breed}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Icon name="Trophy" size={16} className="text-primary" />
                      Титулы
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dog.titles.map((title, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <Icon name="Award" size={16} className="text-secondary" />
                      Достижения
                    </h4>
                    <p className="text-sm text-muted-foreground">{dog.achievements}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <Icon name="Users" size={16} className="text-accent" />
                      Родители
                    </h4>
                    <p className="text-xs text-muted-foreground">{dog.parents}</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Icon name="FileText" size={18} className="mr-2" />
                    Подробная родословная
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="puppies" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Щенки на продажу</h2>
            <p className="text-lg text-muted-foreground">Актуальная информация о пометах</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {litters.map((litter) => (
              <Card key={litter.id} className="overflow-hidden border-2 mb-8">
                <div className="md:flex">
                  <div className="md:w-2/5 relative overflow-hidden h-80 md:h-auto">
                    <img 
                      src={litter.image_url}
                      alt={litter.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        Доступно: {litter.available} щенка
                      </Badge>
                    </div>
                  </div>
                  <div className="md:w-3/5">
                    <CardHeader>
                      <CardTitle className="text-3xl mb-2">{litter.name}</CardTitle>
                      <CardDescription className="text-base">
                        Дата рождения: <span className="font-semibold">{litter.born_date}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Heart" size={18} className="text-primary" />
                          Родители
                        </h4>
                        <p className="text-muted-foreground">{litter.parents}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="Info" size={18} className="text-secondary" />
                          Описание
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">{litter.description}</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm">Что включено:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Icon name="Check" size={16} className="text-green-500" />
                            Документы РКФ-FCI
                          </li>
                          <li className="flex items-center gap-2">
                            <Icon name="Check" size={16} className="text-green-500" />
                            Ветеринарный паспорт, прививки
                          </li>
                          <li className="flex items-center gap-2">
                            <Icon name="Check" size={16} className="text-green-500" />
                            Клеймо, чип (опционально)
                          </li>
                          <li className="flex items-center gap-2">
                            <Icon name="Check" size={16} className="text-green-500" />
                            Консультации по выращиванию
                          </li>
                        </ul>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <Icon name="Phone" size={18} className="mr-2" />
                          Забронировать
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Icon name="Camera" size={18} className="mr-2" />
                          Все фото
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-8 border-2 border-dashed text-center">
              <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Планируемые вязки</h3>
              <p className="text-muted-foreground mb-4">
                Следите за новостями о предстоящих пометах. Возможна предварительная бронь.
              </p>
              <Button variant="outline">
                <Icon name="Mail" size={18} className="mr-2" />
                Уведомить о новых щенках
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Галерея</h2>
            <p className="text-lg text-muted-foreground">Наши собаки на выставках и в повседневной жизни</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {gallery.map((photo, i) => (
              <div 
                key={photo.id}
                className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img 
                  src={photo.image_url}
                  alt={photo.title || `Галерея ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icon name="Expand" size={32} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">Свяжитесь с нами для получения консультации</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="p-6 border-2">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="User" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Владелец питомника</h4>
                      <p className="text-muted-foreground">Иванова Елена Сергеевна</p>
                      <p className="text-sm text-muted-foreground">Заводчик с 2010 года, кинолог РКФ</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Icon name="Phone" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Телефон</h4>
                      <p className="text-muted-foreground">+7 (916) 123-45-67</p>
                      <p className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Icon name="Mail" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">imperial.kennel@mail.ru</p>
                      <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Адрес</h4>
                      <p className="text-muted-foreground">Московская область, г. Истра</p>
                      <p className="text-sm text-muted-foreground">Визиты строго по предварительной записи</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-8 border-2">
                <h3 className="text-2xl font-bold mb-2">Написать нам</h3>
                <p className="text-muted-foreground mb-6">Заполните форму и мы свяжемся с вами</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Ваше сообщение"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Dog" size={28} className="text-primary" />
                <h3 className="text-xl font-bold">Питомник "Империал"</h3>
              </div>
              <p className="text-background/70 text-sm leading-relaxed">
                Профессиональное разведение немецких овчарок с 2010 года. 
                Наши собаки — это здоровье, красота и интеллект.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <div className="space-y-2 text-sm">
                <a href="#about" className="block text-background/70 hover:text-primary transition-colors">О питомнике</a>
                <a href="#dogs" className="block text-background/70 hover:text-primary transition-colors">Производители</a>
                <a href="#puppies" className="block text-background/70 hover:text-primary transition-colors">Щенки</a>
                <a href="#gallery" className="block text-background/70 hover:text-primary transition-colors">Галерея</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
              <p className="text-background/70 text-sm mt-4">
                Член РКФ (Российская Кинологическая Федерация)<br />
                Питомник зарегистрирован в FCI
              </p>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-background/50 text-sm">
              © 2024 Питомник "Империал". Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}