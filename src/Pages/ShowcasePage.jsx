import React, { useState } from "react";
import {
  useTheme,
  useGlobalTokens,
  useThemeContext,
} from "../context/ThemeContext";
import {
  Button,
  Input,
  Card,
  Badge,
  Alert,
  Select,
  Spinner,
  Text,
  ThemeSwitcher,
} from "../Components/ui";

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ title, children }) {
  const theme = useTheme();
  const global = useGlobalTokens();
  return (
    <section style={{ marginBottom: "48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: theme.foundation.primaryColor,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: theme.foundation.borderColor,
          }}
        />
      </div>
      {children}
    </section>
  );
}

// ── Row wrapper ────────────────────────────────────────────────────────────────
function Row({ children, gap = "12px", wrap = true }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap,
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  );
}

// ── Color chip ─────────────────────────────────────────────────────────────────
function ColorChip({ color, label }) {
  const theme = useTheme();
  const global = useGlobalTokens();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: "100px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "44px",
          background: color,
          borderRadius: global.radius.md,
          border: `1px solid ${theme.foundation.borderColor}`,
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: "10px",
          color: theme.typography.helperText,
          fontFamily: "'DM Mono', monospace",
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "10px",
          color: theme.typography.helperText,
          fontFamily: "'DM Mono', monospace",
          opacity: 0.7,
        }}
      >
        {color}
      </p>
    </div>
  );
}

// ── Main showcase ──────────────────────────────────────────────────────────────
export default function ShowcasePage() {
  const theme = useTheme();
  const global = useGlobalTokens();
  const { themeId, isLoading } = useThemeContext();

  const [alertVisible, setAlertVisible] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleLoadingDemo = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  };

  const THEME_BADGE = {
    lightOrange: { intent: "warning", label: "Light Orange" },
    lightOliveGreen: { intent: "success", label: "Light Olive Green" },
    darkGreen: { intent: "neutral", label: "Dark Green" },
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.foundation.applicationBackground,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Spinner size="lg" />
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: theme.typography.helperText,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Loading theme from store…
          </p>
        </div>
      </div>
    );
  }

  console.log("the loading value___", isLoading);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.foundation.applicationBackground,
        transition: "background 0.3s ease",
      }}
    >
      {/* ── Top nav ──────────────────────────────────────────────────────────── */}
      <nav
        style={{
          background: theme.foundation.surfaceBackground,
          borderBottom: `1px solid ${theme.foundation.borderColor}`,
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          height: "60px",
          gap: "16px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: global.shadow.sm,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: theme.foundation.primaryColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: theme.typography.headingText,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            C3 Design System
          </span>
        </div>
        <Badge intent={THEME_BADGE[themeId].intent} dot>
          {THEME_BADGE[themeId].label}
        </Badge>
        <Badge intent="info" size="sm">
          v1.0
        </Badge>
      </nav>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}
      >
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: "64px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "28px",
                background: theme.foundation.primaryColor,
                borderRadius: "2px",
              }}
            />
            <Text variant="h1" style={{ letterSpacing: "-0.02em" }}>
              Theme Design System
            </Text>
          </div>
          <Text
            variant="body"
            style={{ maxWidth: "560px", marginBottom: "24px" }}
          >
            Three fully-token-driven themes — Light Orange, Light Olive Green,
            Dark Green. Switch themes below; the selection persists in
            localStorage (swap for a real DB in production).
          </Text>
          <Row gap="8px">
            <Button
              variant="primary"
              onClick={handleLoadingDemo}
              loading={loadingBtn}
            >
              Save Changes
            </Button>
            <Button variant="secondary">Preview</Button>
            <Button variant="ghost">Documentation</Button>
          </Row>
        </div>

        {/* ── Two-column layout ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* LEFT column */}
          <div>
            {/* Buttons */}
            <Section title="Button System">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "12px",
                      color: theme.typography.helperText,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Variants
                  </p>
                  <Row>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="ghost">Ghost</Button>
                  </Row>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "12px",
                      color: theme.typography.helperText,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Sizes
                  </p>
                  <Row gap="8px">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </Row>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "12px",
                      color: theme.typography.helperText,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    States
                  </p>
                  <Row>
                    <Button variant="primary" loading>
                      Loading
                    </Button>
                    <Button variant="primary" disabled>
                      Disabled
                    </Button>
                    <Button variant="secondary" loading>
                      Saving…
                    </Button>
                    <Button variant="ghost" disabled>
                      Disabled
                    </Button>
                  </Row>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "12px",
                      color: theme.typography.helperText,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    With Icons
                  </p>
                  <Row>
                    <Button
                      variant="primary"
                      leftIcon={
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      }
                    >
                      Add Item
                    </Button>
                    <Button
                      variant="secondary"
                      rightIcon={
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      }
                    >
                      Continue
                    </Button>
                    <Button
                      variant="ghost"
                      leftIcon={
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                      }
                    >
                      Export
                    </Button>
                  </Row>
                </div>
                <div>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "12px",
                      color: theme.typography.helperText,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Full Width
                  </p>
                  <Button variant="primary" fullWidth>
                    Full Width Primary
                  </Button>
                </div>
              </div>
            </Section>

            {/* Inputs */}
            <Section title="Input Field System">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Row gap="16px">
                  <Input
                    label="Default Input"
                    placeholder="Enter text here…"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />

                  <Input
                    label="With Helper"
                    placeholder="your@email.com"
                    helperText="We'll never share your email."
                  />
                </Row>
                <Row gap="16px">
                  <Input
                    label="Error State"
                    placeholder="Username"
                    state="error"
                    errorText="Username is already taken."
                    defaultValue="john_doe"
                  />
                  <Input
                    label="Success State"
                    placeholder="Email"
                    state="success"
                    successText="Email is available!"
                    defaultValue="jane@company.com"
                  />
                </Row>
                <Row gap="16px">
                  <Input
                    label="Disabled"
                    placeholder="Disabled field"
                    disabled
                    value="Cannot edit this"
                  />
                  <Input
                    label="Read Only"
                    placeholder="Read only"
                    readOnly
                    value="Read-only value"
                  />
                </Row>
                <Input
                  label="With Icons"
                  placeholder="Search components…"
                  leftIcon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  }
                  rightIcon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  }
                />
                <Input
                  label="Multiline / Textarea"
                  placeholder="Write your message here…"
                  multiline
                  rows={3}
                />
                <Select
                  label="Select Dropdown"
                  placeholder="Choose an option…"
                  options={[
                    { value: "admin", label: "Administrator" },
                    { value: "editor", label: "Editor" },
                    {
                      value: "viewer",
                      label: "Viewer (Read only)",
                      disabled: false,
                    },
                    { value: "none", label: "No Access" },
                  ]}
                />
              </div>
            </Section>

            {/* Cards */}
            <Section title="Card System">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                }}
              >
                <Card
                  variant="default"
                  header={<Text variant="h4">Default Card</Text>}
                  footer={
                    <Button variant="primary" size="sm">
                      Action
                    </Button>
                  }
                >
                  <Text variant="body">
                    Shadow-elevated surface with header and footer slots.
                  </Text>
                </Card>
                <Card
                  variant="outlined"
                  hoverable
                  header={<Text variant="h4">Outlined</Text>}
                >
                  <Text variant="body">
                    Border-only card. Hoverable — try mousing over.
                  </Text>
                </Card>
                <Card variant="flat" header={<Text variant="h4">Flat</Text>}>
                  <Text variant="body">
                    Uses the secondary background color as fill.
                  </Text>
                </Card>
              </div>
            </Section>

            {/* Badges */}
            <Section title="Badge System">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Row gap="8px">
                  <Badge intent="success" dot>
                    Active
                  </Badge>
                  <Badge intent="warning" dot>
                    Pending
                  </Badge>
                  <Badge intent="error" dot>
                    Failed
                  </Badge>
                  <Badge intent="info" dot>
                    In Review
                  </Badge>
                  <Badge intent="neutral" dot>
                    Archived
                  </Badge>
                </Row>
                <Row gap="8px">
                  <Badge intent="success" size="sm">
                    Success
                  </Badge>
                  <Badge intent="warning" size="sm">
                    Warning
                  </Badge>
                  <Badge intent="error" size="sm">
                    Error
                  </Badge>
                  <Badge intent="info" size="sm">
                    Info
                  </Badge>
                  <Badge intent="neutral" size="sm">
                    Neutral
                  </Badge>
                </Row>
              </div>
            </Section>

            {/* Alerts */}
            <Section title="Alert System">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Alert intent="success" title="Changes saved successfully">
                  Your profile information has been updated and will take effect
                  immediately.
                </Alert>
                <Alert intent="warning" title="Storage nearing limit">
                  You've used 87% of your allocated storage. Consider upgrading
                  your plan.
                </Alert>
                {alertVisible && (
                  <Alert
                    intent="error"
                    title="Authentication failed"
                    onDismiss={() => setAlertVisible(false)}
                  >
                    Invalid credentials. Please check your username and password
                    and try again.
                  </Alert>
                )}
                {!alertVisible && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    onClick={() => setAlertVisible(true)}
                  >
                    ↩ Restore dismissed alert
                  </Button>
                )}
                <Alert intent="info" title="System maintenance scheduled">
                  Planned downtime on Saturday 2:00–4:00 AM UTC. Save your work
                  beforehand.
                </Alert>
              </div>
            </Section>

            {/* Typography */}
            <Section title="Typography Scale">
              <Card variant="outlined" padding="lg">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <Text variant="h1">Heading Level 1 — 28px Bold</Text>
                  <Text variant="h2">Heading Level 2 — 24px Bold</Text>
                  <Text variant="h3">Heading Level 3 — 20px Semibold</Text>
                  <Text variant="h4">Heading Level 4 — 18px Semibold</Text>
                  <div
                    style={{
                      height: "1px",
                      background: theme.foundation.borderColor,
                    }}
                  />
                  <Text variant="body">
                    Body text — 14px Regular. The quick brown fox jumps over the
                    lazy dog. Used for standard readable content throughout the
                    application interface.
                  </Text>
                  <Text variant="bodySmall">
                    Body Small — 12px Regular. Supporting text, table cells,
                    secondary descriptions, and metadata labels.
                  </Text>
                  <Text variant="helper">
                    Helper text — 12px Regular. Used below form fields for
                    guidance.
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "baseline",
                    }}
                  >
                    <Text variant="primary">Primary colored text</Text>
                    <Text variant="accent">Accent colored text</Text>
                  </div>
                </div>
              </Card>
            </Section>

            {/* Spinners */}
            <Section title="Loading Indicators">
              <Row gap="24px">
                {["sm", "md", "lg", "xl"].map((s) => (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Spinner size={s} />
                    <Text variant="helper">{s}</Text>
                  </div>
                ))}
              </Row>
            </Section>

            {/* Color Palette */}
            <Section title={`Active Palette — ${theme.name}`}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <ColorChip
                  color={theme.foundation.primaryColor}
                  label="Primary"
                />
                <ColorChip
                  color={theme.foundation.primaryHover}
                  label="Primary Hover"
                />
                <ColorChip
                  color={theme.foundation.secondaryColor}
                  label="Secondary"
                />
                <ColorChip
                  color={theme.foundation.surfaceBackground}
                  label="Surface"
                />
                <ColorChip
                  color={theme.foundation.applicationBackground}
                  label="App BG"
                />
                <ColorChip
                  color={theme.foundation.borderColor}
                  label="Border"
                />
                <ColorChip color={global.state.success} label="Success" />
                <ColorChip color={global.state.warning} label="Warning" />
                <ColorChip color={global.state.error} label="Error" />
              </div>
            </Section>
          </div>

          {/* RIGHT column — sticky theme switcher */}
          <div style={{ position: "sticky", top: "80px" }}>
            <div style={{ marginBottom: "16px" }}>
              <Text variant="h4" style={{ marginBottom: "4px" }}>
                Theme Control
              </Text>
              <Text variant="helper">
                Super-admin panel. In production, only users with super_admin
                role see this.
              </Text>
            </div>
            <ThemeSwitcher isSuperAdmin={true} />

            {/* Mini form demo */}
            <div style={{ marginTop: "24px" }}>
              <Card
                variant="outlined"
                padding="md"
                header={<Text variant="h4">Quick Form Demo</Text>}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <Input label="Full Name" placeholder="John Appleseed" />
                  <Input
                    label="Email"
                    placeholder="john@company.com"
                    type="email"
                  />
                  <Select
                    label="Role"
                    placeholder="Select role…"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                      { value: "viewer", label: "Viewer" },
                    ]}
                  />
                  <Button variant="primary" fullWidth>
                    Create Account
                  </Button>
                  <Button variant="tertiary" fullWidth>
                    Cancel
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${theme.foundation.borderColor}`,
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: theme.foundation.surfaceBackground,
        }}
      >
        <Text variant="helper">
          C3 Theme Design System · {theme.name} theme active
        </Text>
        <Row gap="8px">
          <Badge intent="success" size="sm" dot>
            3 Themes
          </Badge>
          <Badge intent="info" size="sm" dot>
            9 Components
          </Badge>
        </Row>
      </footer>
    </div>
  );
}
