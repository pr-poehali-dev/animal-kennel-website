import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

export default function Admin() {
  const { user, login, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dogs, setDogs] = useState([]);
  const [litters, setLitters] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dogsData, littersData, galleryData, messagesData] = await Promise.all([
        api.getDogs(),
        api.getLitters(),
        api.getGallery(),
        api.getMessages(user?.role || 'guest')
      ]);
      setDogs(dogsData.dogs || []);
      setLitters(littersData.litters || []);
      setGallery(galleryData.photos || []);
      setMessages(messagesData.messages || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) {
      alert('Неверный логин или пароль');
    }
  };

  const handleDeleteDog = async (id: number) => {
    if (confirm('Удалить эту собаку?')) {
      await api.deleteDog(id, user?.role || 'admin');
      loadData();
    }
  };

  const handleDeleteLitter = async (id: number) => {
    if (confirm('Удалить этот помёт?')) {
      await api.deleteLitter(id, user?.role || 'admin');
      loadData();
    }
  };

  const handleDeletePhoto = async (id: number) => {
    if (confirm('Удалить это фото?')) {
      await api.deletePhoto(id, user?.role || 'admin');
      loadData();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Вход в админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Логин</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <Label>Пароль</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Войти</Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/')}>
                На главную
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <p className="text-lg mb-4">У вас нет доступа к админ-панели</p>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Админ-панель</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="Home" size={18} className="mr-2" />
              На сайт
            </Button>
            <Button variant="outline" onClick={logout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Производители ({dogs.length})</CardTitle>
              <Button onClick={() => alert('Функция добавления в разработке')}>
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить собаку
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? <p>Загрузка...</p> : (
                <div className="grid md:grid-cols-2 gap-4">
                  {dogs.map((dog: any) => (
                    <Card key={dog.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{dog.name}</h3>
                          <p className="text-sm text-muted-foreground">{dog.breed} • {dog.gender}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {dog.titles?.map((title: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">{title}</Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDog(dog.id)}
                        >
                          <Icon name="Trash2" size={18} className="text-destructive" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Щенки ({litters.length})</CardTitle>
              <Button onClick={() => alert('Функция добавления в разработке')}>
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить помёт
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? <p>Загрузка...</p> : (
                <div className="space-y-4">
                  {litters.map((litter: any) => (
                    <Card key={litter.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{litter.name}</h3>
                          <p className="text-sm text-muted-foreground">Дата рождения: {litter.born_date}</p>
                          <p className="text-sm">Доступно: {litter.available} щенков</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLitter(litter.id)}
                        >
                          <Icon name="Trash2" size={18} className="text-destructive" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Галерея ({gallery.length})</CardTitle>
              <Button onClick={() => alert('Функция добавления в разработке')}>
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить фото
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? <p>Загрузка...</p> : (
                <div className="grid grid-cols-4 gap-4">
                  {gallery.map((photo: any) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeletePhoto(photo.id)}
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Сообщения ({messages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <p>Загрузка...</p> : (
                <div className="space-y-4">
                  {messages.map((msg: any) => (
                    <Card key={msg.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{msg.name}</h4>
                          <p className="text-sm text-muted-foreground">{msg.email} • {msg.phone}</p>
                        </div>
                        <Badge variant={msg.status === 'new' ? 'default' : 'secondary'}>
                          {msg.status === 'new' ? 'Новое' : 'Прочитано'}
                        </Badge>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{msg.created_at}</p>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
