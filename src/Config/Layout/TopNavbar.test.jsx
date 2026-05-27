import { render, screen } from "@testing-library/react";
import TopNavbar from "./TopNavbar";

describe("TopNavbar", () => {
  test("renders logo", () => {
    render(
      <TopNavbar
        isMobile={false}
        isTablet={false}
        mobileOpen={false}
        collapsed={false}
        onMobileToggle={() => {}}
      />
    );

    const logo = screen.getByAltText("Logo");

    expect(logo).toBeInTheDocument();
  });
});