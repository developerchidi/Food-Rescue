export default function ProfilePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=80"
            alt="Avatar"
            className="h-28 w-28 rounded-full border border-slate-200 object-cover"
          />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Hồ sơ người dùng</p>
            <h1 className="mt-3 text-4xl font-black text-slate-900">Nguyễn Văn A</h1>
            <p className="mt-2 max-w-xl text-slate-600">
              Trang cá nhân hiển thị thông tin tài khoản, lịch sử đơn hàng và các hoạt động giải cứu.
            </p>
          </div>
        </div>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Name</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">Nguyễn Văn A</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Email</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">user@example.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}
