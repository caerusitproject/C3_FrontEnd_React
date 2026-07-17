import React, { useEffect, useState } from "react";
import { Button } from "../../Components/ui/Button/Button";
import { Text } from "../../Components/ui";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { useDevice } from "../../hooks/useDevice";
import { Card } from "../../Components/ui/Card/Card";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  globalLoaderOpen,
  globalLoaderClose,
} from "../../store/slices/globalSlice";

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
    icon: " ",
    url: "https://contacts.company.com",
  },
];

const fetchBroadcasts = async () => {
  const response = await fetch("/api/broadcasts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch broadcasts");
  }

  return response.json();
};

export default function Home() {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.login);

  const [broadcasts, setBroadcasts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedSlide, setExpandedSlide] = useState(null);
  const [error, setError] = useState(null);

  const isExpanded = expandedSlide === activeSlide;

  // Fetch broadcasts with loader
  useEffect(() => {
    const loadBroadcasts = async () => {
      dispatch(globalLoaderOpen());
      setError(null);

      try {
        const data = [
          {
            id: 1,
            title: "Happy Holi!",
            description:
              "May your life be filled with vibrant colours of happiness, love and success.",
            image: "",
          },
          {
            id: 2,
            title: "Company Townhall",
            description:
              "Join the monthly townhall meeting this Friday at 4 PM ISTMay your life be filled with vibrant colours of happiness, love and successMay your life be filled with joy.",
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

        const fallbackData = [
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
              "Join the monthly townhall meeting this Friday at 4 PM IST.",
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

        const broadcastData =
          Array.isArray(data) && data.length > 0
            ? data.map((item) => ({
                ...item,
                image: item.image || item.imageUrl || item.bannerImage || "",
              }))
            : fallbackData;

        setBroadcasts(broadcastData);

        if (broadcastData.length > 0) {
          setActiveSlide(0);
        }
      } catch (err) {
        console.error("Broadcast fetch error:", err);
        setBroadcasts([]);
      } finally {
        dispatch(globalLoaderClose());
      }
    };

    loadBroadcasts();
  }, [dispatch]);

  const handleReadMore = () => {
    setExpandedSlide((prev) => (prev === activeSlide ? null : activeSlide));
  };

  const handleOpenLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Auto slide
  useEffect(() => {
    if (isExpanded || broadcasts.length === 0) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % broadcasts.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isExpanded, broadcasts.length]);

  const current = broadcasts[activeSlide];
  const SHOW_READ_MORE_LIMIT = 120;
  const shouldShowReadMore =
    current?.description?.length > SHOW_READ_MORE_LIMIT;

  return (
    <div
      style={{
        padding: isMobile ? "16px" : "32px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* Greeting */}
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
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {/* Important Links */}
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
              marginBottom: isMobile ? "8px" : "12px",
            }}
          >
            Important Links
          </Text>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "23px" }}
          >
            {links.map(({ id, label, icon, url }) => (
              <Button
                key={id}
                variant="surface"
                width="fit-content"
                leftIcon={<span>{icon}</span>}
                title={url}
                style={{ borderRadius: "12px", justifyContent: "flex-start" }}
                onClick={() => handleOpenLink(url)}
              >
                {label}
                <ArrowBackIcon
                  fontSize="inherit"
                  style={{
                    marginLeft: "6px",
                    transform: "rotate(180deg)",
                    fontSize: "16px",
                    flexShrink: 0,
                    color: theme.typography.primaryText,
                  }}
                />
              </Button>
            ))}
          </div>
        </div>

        {/* Broadcast Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            order: isMobile ? 1 : 2,
          }}
        >
          <div style={{ marginLeft: isMobile ? "0" : "12%" }}>
            <Text
              variant="h2"
              style={{
                color: theme.typography.helperText,
                marginBottom: "4px",
                display: "block",
              }}
            >
              Here's what's happening today
            </Text>
          </div>

          {error && (
            <Text style={{ color: "#ff6b6b", textAlign: "center" }}>
              {error}
            </Text>
          )}

          <Card
            padding="none"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              width: isMobile ? "100%" : "80%",
              marginLeft: isMobile ? "0" : "12%",
            }}
          >
            {/* Image Section */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: isMobile ? "70%" : "52%",
                overflow: "hidden",
              }}
            >
              {broadcasts.length > 0 ? (
                broadcasts.map((item, i) => (
                  <div
                    key={item.id || i}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: i === activeSlide ? 1 : 0,
                      transition: "opacity 0.7s ease",
                    }}
                  >
                    {item.image &&
                    typeof item.image === "string" &&
                    item.image.trim() !== "" ? (
                      <img
                        src={item.image}
                        alt={item.title || "broadcast"}
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          background: theme.foundation.surfaceBackground,
                          color: theme.typography.helperText,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "40px",
                            color: theme.typography.helperText,
                          }}
                        >
                          📢
                        </span>
                        <span style={{ color: theme.typography.helperText }}>
                          No Preview Available
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: theme.foundation.surfaceBackground,
                    color: theme.typography.helperText,
                  }}
                >
                  <span style={{ fontSize: "48px", marginBottom: "12px" }}>
                    📭
                  </span>
                  <Text
                    variant="h3"
                    style={{
                      color: theme.typography.helperText,
                      marginBottom: "8px",
                    }}
                  >
                    No Broadcast for today
                  </Text>
                  <Text
                    variant="bodySmall"
                    style={{ color: theme.typography.helperText, opacity: 0.7 }}
                  >
                    Check back later for updates
                  </Text>
                </div>
              )}

              {/* Bottom gradient - only show when there are broadcasts */}
              {broadcasts.length > 0 && (
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
              )}

              {/* Dot indicators - only show when there are broadcasts */}
              {broadcasts.length > 0 && (
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
                  {broadcasts.map((_, index) => (
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
              )}
            </div>

            {/* Content Section */}
            {broadcasts.length > 0 && current && (
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
                      onClick={handleReadMore}
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
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
