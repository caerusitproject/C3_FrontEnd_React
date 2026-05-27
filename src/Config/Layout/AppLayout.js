import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "../../store/slices/loginSlice";
import TopNavbar from "./TopNavbar";
import SideNavbar from "./SideNavbar";
import Footer from "./Footer";
import { GlobalAlert } from "../../Components/ui/Alert/GlobalAlert";

export default function AppLayout() {
  const theme = useTheme();
  const collapsed = useSelector((state) => state.login.collapsed);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletCollapsed, setTabletCollapsed] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);

      // close mobile drawer on desktop/tablet
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: theme.foundation.applicationBackground,
        transition: "background 0.3s ease",
        overflow: "hidden",
      }}
    >
      <GlobalAlert />

      {/* TOP NAVBAR */}
      <TopNavbar
        isMobile={isMobile}
        isTablet={width >= 768 && width < 1024}
        mobileOpen={mobileOpen}
        collapsed={isTablet ? tabletCollapsed : collapsed}
        onMobileToggle={() => {
          if (isMobile) {
            setMobileOpen((prev) => !prev);
          } else if (isTablet) {
            setTabletCollapsed((prev) => !prev); // tablet uses local state
          } else {
            dispatch(toggleSidebar()); // desktop uses Redux
          }
        }}
      />

      {/* BODY */}
      <div
        style={{
          display: "flex",
          flex: 1,
          // "overflow: hidden" on a flex container prevents position:sticky
          // from working inside it. On desktop we need the content area to
          // scroll (handled by the inner <main>), not this wrapper.
          overflow: isMobile ? "hidden" : "visible",
          position: "relative",
          // Ensure this row doesn't exceed the remaining viewport height
          minHeight: 0,
        }}
      >
        {/* MOBILE OVERLAY */}
        {isMobile && mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 9998,
            }}
          />
        )}

        {/* SIDEBAR */}
        <aside
          style={{
            // Mobile: fixed overlay covering full screen (above navbar via zIndex)
            // Tablet/Desktop: sticky so it stays in place while content scrolls
            position: isMobile ? "fixed" : "sticky",
            top: 0,
            left: 0,
            // 100vh works for all modes:
            // Mobile: covers navbar too (high zIndex lifts it above everything)
            // Tablet/Desktop: sticky needs explicit viewport height — height:100% has no resolved parent in a flex row
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            width: isMobile
              ? "256px"
              : isTablet
              ? tabletCollapsed
                ? "72px"
                : "256px"
              : collapsed
              ? "72px"
              : "256px",
            background: theme.foundation.surfaceBackground,
            borderRight: `1px solid ${theme.foundation.borderColor}`,
            zIndex: 9999,
            flexShrink: 0,
            overflow: "hidden",

            transform: isMobile
              ? mobileOpen
                ? "translateX(0)"
                : "translateX(-100%)"
              : "translateX(0)",

            // All layout-affecting properties animated so breakpoint switches are smooth:
            // width  — tablet collapse/expand + mobile→tablet→desktop resize
            // transform — mobile slide in/out
            // background, border-color — theme changes
            // box-shadow — mobile open shadow fade
            transition:
              "width 0.3s ease, transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",

            boxShadow:
              isMobile && mobileOpen ? "4px 0 24px rgba(0,0,0,0.18)" : "none",
          }}
        >
          <SideNavbar
            collapsed={
              isMobile ? false : isTablet ? tabletCollapsed : collapsed
            }
            onToggleSidebar={() => {
              if (isTablet) setTabletCollapsed((prev) => !prev);
              else dispatch(toggleSidebar());
            }}
            isMobile={isMobile}
            isTablet={width >= 768 && width < 1024}
            onNavClick={() => setMobileOpen(false)}
            onToggleMobile={() => setMobileOpen(false)}
          />
        </aside>

        {/* RIGHT CONTENT AREA */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            // On desktop: this column must scroll on its own so sticky sidebar works.
            // overflow: hidden would prevent that.
            overflow: isMobile ? "hidden" : "auto",
            // Constrain height so footer stays at bottom of content, not page
            minHeight: 0,
            background: theme.foundation.applicationBackground,
          }}
        >
          {/* MAIN */}
          <main
            style={{
              flex: 1,
              // Parent column scrolls on desktop; on mobile parent is hidden so main scrolls
              overflowY: isMobile ? "auto" : "visible",
              background: theme.foundation.applicationBackground,
              transition: "background 0.3s ease",
            }}
          >
            <Outlet />
          </main>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
