function AppLayout() {
  const collapsed = useSelector((state) => state.login.collapsed);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const dispatch = useDispatch();

  // Watch for resize → update mobile/desktop mode

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("sidenavbar__", collapsed);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Top AppBar */}
        <TopNavbar isMobile={isMobile} setIsMobile={setIsMobile} />
        {/* Push content below appbar */}
        <Toolbar />

        {/* Body: Sidebar + Main */}
        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar */}
          <SideNavbar isMobile={isMobile} />

          {/* Main Content */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Suspense fallback={<LinearProgress sx={{ mt: 1.5 }} />}>
              <GlobalLoader />
              <SuccessFailureSnackbar />

              <main
                style={{
                  flex: 1,
                  padding: "20px",
                  overflowY: "auto",
                  overflowX: "auto",
                }}
              >
                <Outlet />
              </main>
              <Footer />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </>
  );
}
