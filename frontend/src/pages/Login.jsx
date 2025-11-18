import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginUserMutation } from '@/store/api/userApiSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getUser } from '@/store/slices/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password }).unwrap();

      toast.success(res.message);

      dispatch(getUser(res.data.loggedUser));

      navigate("/instructors"); 
      
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  };


  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">

        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to your LMS Dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type={email} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <Button disabled={isLoading} className="w-full">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">Register</Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
