import { redirect } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { loginAction } from "@/app/admin/login/actions";

export const metadata = { title: "Đăng nhập quản trị | 909 Lumina", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getAdminSession()) redirect("/admin");
  const { error } = await searchParams;
  return <main className="admin-login-page"><div className="admin-login-visual"><div><p>909 LUMINA</p><h1>Không gian của bạn.<br />Nội dung của bạn.</h1><span>Quản lý website đa ngôn ngữ từ một nơi duy nhất.</span></div></div><div className="admin-login-panel"><form action={loginAction} className="admin-login-form"><div className="admin-login-logo"><span>909</span> LUMINA<small>OWNER PORTAL</small></div><h2>Chào mừng trở lại</h2><p>Đăng nhập bằng tài khoản chủ quán.</p>{error && <div className="admin-alert error" role="alert">{error === "rate-limit" ? "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng chờ 15 phút rồi thử lại." : "Email hoặc mật khẩu chưa đúng."}</div>}<label><span>Email</span><div><Mail /><input type="email" name="email" required autoComplete="email" placeholder="owner@909lumina.vn" /></div></label><label><span>Mật khẩu</span><div><LockKeyhole /><input type="password" name="password" required autoComplete="current-password" /></div></label><button type="submit" className="admin-primary-button">Đăng nhập</button><small>Phiên đăng nhập được bảo vệ bằng cookie HTTP-only và chữ ký máy chủ.</small></form></div></main>;
}
