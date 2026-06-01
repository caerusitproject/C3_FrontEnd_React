import React, { useEffect, useState } from "react";
import { Button } from "../../Components/ui/Button/Button";
import { Text } from "../../Components/ui";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { useDevice } from "../../hooks/useDevice";
import { Card } from "../../Components/ui/Card/Card";

const broadcastData = [
  {
    id: 1,
    title: "Happy Holi!",
    description:
      "May your life be filled with vibrant colours of happiness, love and success.",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200",
  },
  {
    id: 2,
    title: "Company Townhall",
    description:
      "Join the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM ISTJoin the monthly townhall meeting this Friday at 4 PM IST.",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200",
  },
  {
    id: 3,
    title: "Wellness Week",
    description:
      "Participate in our wellness activities and earn reward points.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
  },
];

const links = [
  {
    id: 1,
    label: "Track IT",
    icon: "🖥️",
    url: "https://trackit.company.com",
  },
  {
    id: 2,
    label: "Server Link",
    icon: "🔗",
    url: "https://server.company.com",
  },
  {
    id: 3,
    label: "Important Contacts",
    icon: "�",
    url: "https://contacts.company.com",
  },
];

export default function Home() {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const { loggedInUser } = useSelector((state) => state.login);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedSlide, setExpandedSlide] = useState(null);
  const isExpanded = expandedSlide === activeSlide;

  const handleReadMore = () => {
    setExpandedSlide((prev) => (prev === activeSlide ? null : activeSlide));
  };

  const handleOpenLink = (url) => {
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (isExpanded) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % broadcastData.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isExpanded]);

  const current = broadcastData[activeSlide];
  const SHOW_READ_MORE_LIMIT = 120;

  const shouldShowReadMore = current.description.length > SHOW_READ_MORE_LIMIT;

  return (
    <div
      style={{
        padding: isMobile ? "16px" : "32px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* ── GREETING ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Text variant="h1" style={{ color: theme.foundation.primaryColor }}>
          Welcome back
          {loggedInUser?.employeeName
            ? `, ${
                isMobile
                  ? loggedInUser.employeeName.split(" ")[0]
                  : loggedInUser.employeeName
              }`
            : ""}
          !
        </Text>
        <Text variant="helper" style={{ color: theme.foundation.borderColor }}>
          Here's what's happening today.
        </Text>
      </div>

      {/* ── MAIN GRID ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {/* ── LEFT: Important Links ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            order: isMobile ? 2 : 1,
          }}
        >
          <Text
            variant="h3"
            style={{
              color: theme.typography.helperText,
              opacity: 0.7,
              //textTransform: "uppercase",
              // letterSpacing: "0.08em",
              // fontSize: "11px",
              marginBottom: isMobile ? "8px" : "12px",
            }}
          >
            Important Links
          </Text>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "23px",
            }}
          >
            {links.map(({ id, label, icon, url }) => (
              <Button
                key={id}
                variant="surface"
                //size="md"
                width="fit-content"
                leftIcon={<span>{icon}</span>}
                style={{
                  borderRadius: "12px",
                  justifyContent: "flex-start",
                }}
                onClick={() => handleOpenLink(url)}
              >
                {label} →
              </Button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Broadcast ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            order: isMobile ? 1 : 2,
          }}
        >
          {/* Label + Card aligned together, card offset 20% from left to match right-shifted card */}
          <div style={{ marginLeft: isMobile ? "0" : "20%" }}>
            <Text
              variant="h3"
              style={{
                color: theme.typography.helperText,
                // textTransform: "uppercase",
                // letterSpacing: "0.08em",
                // fontSize: "11px",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Broadcasts
            </Text>
          </div>

          <Card
            padding="none"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              width: isMobile ? "100%" : "80%",
              marginLeft: "auto",
            }}
          >
            {/* Image with crossfade */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: isMobile ? "70%" : "52%",
                overflow: "hidden",
              }}
            >
              {broadcastData.map((item, i) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: i === activeSlide ? 1 : 0,
                    transition: "opacity 0.7s ease",
                  }}
                />
              ))}

              {/* Bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "55%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* Dot indicators on image */}
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "6px",
                  zIndex: 2,
                }}
              >
                {broadcastData.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    style={{
                      width: activeSlide === index ? "24px" : "7px",
                      height: "7px",
                      borderRadius: "999px",
                      background:
                        activeSlide === index
                          ? "#fff"
                          : "rgba(255,255,255,0.45)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content row */}
            <div
              style={{
                padding: isMobile ? "16px" : "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <Text variant="h3">{current.title}</Text>

              <Text
                variant="bodySmall"
                style={{
                  color: theme.typography.helperText,
                  display: "-webkit-box",
                  WebkitLineClamp: isExpanded ? "unset" : 2,
                  WebkitBoxOrient: "vertical",
                  overflow: isExpanded ? "visible" : "hidden",
                }}
              >
                {current.description}
              </Text>

              {shouldShowReadMore && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "4px",
                  }}
                >
                  <Text
                    variant="primary"
                    onClick={() =>
                      setExpandedSlide(isExpanded ? null : activeSlide)
                    }
                    style={{
                      cursor: "pointer",
                      color: theme.typography.primaryText,
                      fontWeight: 600,
                    }}
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </Text>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
