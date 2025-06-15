import AuthForm from "@/components/AuthForm"
import '../../../styles/style.css'
export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <AuthForm type="signup" />
    </div>
  )
}
