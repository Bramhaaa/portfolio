"use client";

import React, { useEffect, useState } from "react";
import { Column, Row, Text, Icon, RevealFx, Tag, Button, Heading } from "@once-ui-system/core";
import { person } from "@/resources";
import styles from "./CodingStats.module.scss";

interface LeetCodeStats {
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
  } | null;
  userContestRankingHistory: Array<{
    attended: boolean;
    rating: number;
    ranking: number;
    contest: {
      title: string;
      startTime: number;
    };
  }>;
  matchedUser: {
    submitStats: {
      acSubmissionNum: Array<{
        difficulty: string;
        count: number;
      }>;
    };
  } | null;
  allQuestionsCount: Array<{
    difficulty: string;
    count: number;
  }>;
}

interface GfgStats {
  school: number;
  basic: number;
  easy: number;
  medium: number;
  hard: number;
  score: number;
  totalSolved: number;
}

interface GitHubDay {
  color: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  date: string;
}

interface GitHubStats {
  totalContributions: number;
  contributions: GitHubDay[][];
}

export function CodingStats() {
  const handles = person.handles || {
    github: "bramhaaa",
    leetcode: "general_BR",
    geeksforgeeks: "generalbr",
  };

  const [lcData, setLcData] = useState<LeetCodeStats | null>(null);
  const [gfgData, setGfgData] = useState<GfgStats | null>(null);
  const [ghData, setGhData] = useState<GitHubStats | null>(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [gfgLoading, setGfgLoading] = useState(true);
  const [ghLoading, setGhLoading] = useState(true);

  // Interaction States
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    rating: number;
    ranking: number;
    contestTitle: string;
    date: string;
  } | null>(null);

  const [hoveredContrib, setHoveredContrib] = useState<{
    x: number;
    y: number;
    count: number;
    date: string;
  } | null>(null);

  useEffect(() => {
    // Fetch LeetCode stats from our API route
    async function fetchLeetCode() {
      try {
        const res = await fetch(`/api/leetcode?username=${handles.leetcode}`);
        if (res.ok) {
          const data = await res.json();
          setLcData(data);
        }
      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
      } finally {
        setLcLoading(false);
      }
    }

    // Fetch GitHub contributions calendar from our API route
    async function fetchGitHub() {
      try {
        const res = await fetch(`/api/github?username=${handles.github}`);
        if (res.ok) {
          const data = await res.json();
          setGhData(data);
        }
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
      } finally {
        setGhLoading(false);
      }
    }

    // Fetch GeeksforGeeks stats from our API route
    async function fetchGFG() {
      try {
        const res = await fetch(`/api/gfg?username=${handles.geeksforgeeks}`);
        if (res.ok) {
          const data = await res.json();
          setGfgData(data);
        }
      } catch (err) {
        console.error("Error fetching GFG data:", err);
      } finally {
        setGfgLoading(false);
      }
    }

    fetchLeetCode();
    fetchGitHub();
    fetchGFG();
  }, [handles.leetcode, handles.github, handles.geeksforgeeks]);

  // Extract LeetCode solved counts
  const getSolvedCount = (difficulty: string) => {
    if (!lcData?.matchedUser) return 0;
    const item = lcData.matchedUser.submitStats.acSubmissionNum.find(
      (x) => x.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
    return item ? item.count : 0;
  };

  const getTotalCount = (difficulty: string) => {
    if (!lcData?.allQuestionsCount) return 1;
    const item = lcData.allQuestionsCount.find(
      (x) => x.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
    return item ? item.count : 1;
  };

  const easySolved = getSolvedCount("easy");
  const easyTotal = getTotalCount("easy");
  const mediumSolved = getSolvedCount("medium");
  const mediumTotal = getTotalCount("medium");
  const hardSolved = getSolvedCount("hard");
  const hardTotal = getTotalCount("hard");
  const totalSolved = easySolved + mediumSolved + hardSolved;
  const totalQuestions = easyTotal + mediumTotal + hardTotal;

  // Filter attended contests for graph rendering
  const attendedContests = lcData?.userContestRankingHistory?.filter((x) => x.attended) || [];

  // Generate SVG coordinates for LeetCode ranking chart
  const renderContestGraph = () => {
    if (attendedContests.length < 2) {
      return (
        <Column fillWidth vertical="center" horizontal="center" height={180} gap="8">
          <Icon name="calendar" size="m" style={{ color: "var(--text-muted)" }} />
          <Text variant="body-default-s" style={{ color: "var(--text-muted)" }}>
            Not enough contest history to display ranking graph
          </Text>
        </Column>
      );
    }

    const svgWidth = 500;
    const svgHeight = 160;
    const padding = 15;

    const ratings = attendedContests.map((c) => c.rating);
    const minRating = Math.min(...ratings) - 50;
    const maxRating = Math.max(...ratings) + 50;
    const ratingRange = maxRating - minRating;

    const points = attendedContests.map((c, i) => {
      const x = padding + (i / (attendedContests.length - 1)) * (svgWidth - padding * 2);
      const y = svgHeight - padding - ((c.rating - minRating) / ratingRange) * (svgHeight - padding * 2);
      return { 
        x, 
        y, 
        rating: Math.round(c.rating), 
        ranking: c.ranking,
        title: c.contest.title, 
        date: new Date(c.contest.startTime * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
      };
    });

    // Construct line path
    let linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      linePath += ` L ${points[i].x} ${points[i].y}`;
    }

    // Construct area path for gradient fill
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

    return (
      <div style={{ position: "relative", width: "100%", height: "180px" }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="100%" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--graph-gradient-start)" />
              <stop offset="100%" stopColor="var(--graph-gradient-end)" />
            </linearGradient>
            
          </defs>

          {/* Grid Lines */}
          <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="var(--border)" strokeWidth="0.75" strokeDasharray="3" />
          <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="var(--border)" strokeWidth="0.75" strokeDasharray="3" />
          <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="var(--border)" strokeWidth="0.75" strokeDasharray="3" />

          {/* Area under the path */}
          <path d={areaPath} fill="url(#chartGrad)" style={{ transition: "all 0.5s ease" }} />

          {/* Guideline line on hover */}
          {hoveredPoint && (
            <line 
              x1={hoveredPoint.x} 
              y1={padding} 
              x2={hoveredPoint.x} 
              y2={svgHeight - padding} 
              stroke="var(--graph-line)" 
              strokeWidth="1.5" 
              strokeDasharray="4" 
              opacity="0.4"
            />
          )}

          {/* Ranking line */}
          <path 
            d={linePath} 
            fill="none" 
            stroke="var(--graph-line)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ transition: "all 0.5s ease" }}
          />

          {/* Invisible hit areas preserve tooltips without visible point markers. */}
          {points.map((p, index) => (
            <rect
              key={index}
              x={p.x - Math.max(8, (svgWidth - padding * 2) / points.length / 2)}
              y={0}
              width={Math.max(16, (svgWidth - padding * 2) / points.length)}
              height={svgHeight}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredPoint({ x: p.x, y: p.y, rating: p.rating, ranking: p.ranking, contestTitle: p.title, date: p.date })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Custom Tooltip */}
        {hoveredPoint && (
          <div
            className={styles.customTooltip}
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              top: `${(hoveredPoint.y / svgHeight) * 100 - 45}%`,
            }}
          >
            <Text variant="label-strong-s" style={{ color: "var(--accent)" }}>
              Rating: {hoveredPoint.rating}
            </Text>
            <Text variant="body-default-xs" style={{ display: "block", marginTop: "2px", color: "var(--text-primary)" }}>
              {hoveredPoint.contestTitle}
            </Text>
            <Text variant="body-default-xs" style={{ display: "block", color: "var(--text-secondary)" }}>
              Global Rank: #{hoveredPoint.ranking.toLocaleString()}
            </Text>
            <Text variant="body-default-xs" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
              {hoveredPoint.date}
            </Text>
          </div>
        )}
      </div>
    );
  };

  // Render native interactive GitHub Heatmap calendar
  const renderGitHubHeatmap = () => {
    if (!ghData || !ghData.contributions || ghData.contributions.length === 0) {
      return (
        <Column fillWidth vertical="center" horizontal="center" height={130} gap="8">
          <Icon name="github" size="m" style={{ color: "var(--text-muted)" }} />
          <Text variant="body-default-s" style={{ color: "var(--text-muted)" }}>
            No GitHub activity details found
          </Text>
        </Column>
      );
    }

    const rectSize = 10;
    const gap = 3.5; // Increased spacing between cells
    const totalWeeks = ghData.contributions.length;
    const svgWidth = totalWeeks * (rectSize + gap) + 10;
    const svgHeight = 7 * (rectSize + gap) + 15;

    // Map quartile level to refined blue scale
    const getLevelFill = (level: string) => {
      switch (level) {
        case "FIRST_QUARTILE":
          return "var(--heatmap-level-1)";
        case "SECOND_QUARTILE":
          return "var(--heatmap-level-2)";
        case "THIRD_QUARTILE":
          return "var(--heatmap-level-3)";
        case "FOURTH_QUARTILE":
          return "var(--heatmap-level-4)";
        default:
          return "var(--heatmap-level-0)";
      }
    };

    return (
      <div style={{ position: "relative", width: "100%" }}>
        <div style={{ overflowX: "auto", width: "100%", paddingBottom: "4px" }}>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" style={{ minWidth: "680px", overflow: "visible" }}>
            <g>
              {ghData.contributions.map((week, weekIndex) => (
                <g key={weekIndex} transform={`translate(${weekIndex * (rectSize + gap)}, 0)`}>
                  {week.map((day, dayIndex) => {
                    const rectY = dayIndex * (rectSize + gap);
                    return (
                      <rect
                        key={day.date}
                        y={rectY}
                        width={rectSize}
                        height={rectSize}
                        rx={2.5} // Rounded corners
                        ry={2.5}
                        fill={getLevelFill(day.contributionLevel)}
                        style={{ transition: "fill 0.2s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer" }}
                        onMouseEnter={(e) => {
                          setHoveredContrib({
                            x: weekIndex * (rectSize + gap) + rectSize / 2,
                            y: rectY,
                            count: day.contributionCount,
                            date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                          });
                        }}
                        onMouseLeave={() => setHoveredContrib(null)}
                      />
                    );
                  })}
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Heatmap Tooltip */}
        {hoveredContrib && (
          <div
            className={styles.customTooltip}
            style={{
              left: `${(hoveredContrib.x / svgWidth) * 100}%`,
              top: `${(hoveredContrib.y / svgHeight) * 100 - 32}%`,
            }}
          >
            <Text variant="label-strong-xs" style={{ color: "var(--accent)" }}>
              {hoveredContrib.count} {hoveredContrib.count === 1 ? "contribution" : "contributions"}
            </Text>
            <Text variant="body-default-xs" style={{ display: "block", fontSize: "9px", marginTop: "2px", color: "var(--text-primary)" }}>
              {hoveredContrib.date}
            </Text>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.statsContainer}>
      <RevealFx translateY="12" delay={0.4} fillWidth>
        <Column fillWidth gap="xl" paddingX="l" marginBottom="40" style={{ maxWidth: "80rem", margin: "0 auto" }}>
          {/* Section Title */}
          <Column gap="4" align="center" fillWidth>
            <Heading as="h2" variant="display-strong-s">
              Coding Metrics & Activity
            </Heading>
            <Text variant="body-default-m" style={{ color: "var(--text-secondary)" }}>
              Real-time developer stats aggregated across coding platforms.
            </Text>
          </Column>

          {/* Dashboard Grid */}
          <Row gap="24" fillWidth s={{ direction: "column" }}>
            {/* LEFT SECTION - Heatmap & Ranking Graph (65% width) */}
            <Column flex={7} gap="24" className={styles.dashboardColumn}>
              {/* GitHub Contributions Card */}
              <div className={styles.glassCard}>
                <Column gap="16">
                  <Row horizontal="between" vertical="center" fillWidth>
                    <Row gap="8" vertical="center">
                      <Icon name="github" size="s" style={{ color: "var(--accent)" }} />
                      <Text variant="heading-strong-m" style={{ color: "var(--text-primary)" }}>GitHub Contributions</Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      {!ghLoading && ghData && (
                        <Text variant="body-default-xs" style={{ color: "var(--text-muted)" }}>
                          {ghData.totalContributions.toLocaleString()} total
                        </Text>
                      )}
                      <a href={`https://github.com/${handles.github}`} target="_blank" rel="noreferrer" className={styles.platformBadge}>
                        <Tag size="s" style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                          @{handles.github}
                        </Tag>
                      </a>
                    </Row>
                  </Row>

                  {ghLoading ? (
                    <Column fillWidth vertical="center" horizontal="center" height={130} className="animate-pulse">
                      <div style={{ width: "90%", height: "90px", background: "var(--neutral-alpha-weak)", borderRadius: "6px" }} />
                    </Column>
                  ) : (
                    renderGitHubHeatmap()
                  )}
                </Column>
              </div>

              {/* LeetCode Contest Ranking Card */}
              <div className={styles.glassCard}>
                <Column gap="16">
                  <Row horizontal="between" vertical="center" fillWidth>
                    <Row gap="8" vertical="center">
                      <Icon name="leetcode" size="s" style={{ color: "var(--accent)" }} />
                      <Text variant="heading-strong-m" style={{ color: "var(--text-primary)" }}>LeetCode Contest Ranking</Text>
                    </Row>
                    {lcData?.userContestRanking && (
                      <Tag size="s" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--accent)", fontWeight: "600" }}>
                        Rating: {Math.round(lcData.userContestRanking.rating)}
                      </Tag>
                    )}
                  </Row>

                  {lcLoading ? (
                    <Column fillWidth vertical="center" horizontal="center" height={180} className="animate-pulse">
                      <div style={{ width: "80%", height: "120px", background: "var(--neutral-alpha-weak)", borderRadius: "6px" }} />
                    </Column>
                  ) : (
                    renderContestGraph()
                  )}

                  {!lcLoading && lcData?.userContestRanking && (
                    <Row gap="24" fillWidth wrap horizontal="between" paddingTop="8">
                      <Column>
                        <Text className={styles.metricLabel}>Global Rank</Text>
                        <Text className={styles.metricValue}>
                          {lcData.userContestRanking.globalRanking.toLocaleString()}
                        </Text>
                      </Column>
                      <Column>
                        <Text className={styles.metricLabel}>Top Percentage</Text>
                        <Text className={styles.metricValue}>
                          {lcData.userContestRanking.topPercentage.toFixed(1)}%
                        </Text>
                      </Column>
                      <Column>
                        <Text className={styles.metricLabel}>Contests</Text>
                        <Text className={styles.metricValue}>
                          {lcData.userContestRanking.attendedContestsCount}
                        </Text>
                      </Column>
                    </Row>
                  )}
                </Column>
              </div>
            </Column>

            {/* RIGHT SECTION - Problem Solving Stats & Profiles (35% width) */}
            <Column flex={4} gap="24" className={styles.dashboardColumn}>
              {/* LeetCode Solved Progress Card */}
              <div className={styles.glassCard}>
                <Column gap="16">
                  <Row horizontal="between" vertical="center" fillWidth>
                    <Row gap="8" vertical="center">
                      <Icon name="leetcode" size="s" style={{ color: "var(--accent)" }} />
                      <Text variant="heading-strong-m" style={{ color: "var(--text-primary)" }}>LeetCode Solved</Text>
                    </Row>
                    <a href={`https://leetcode.com/u/${handles.leetcode}`} target="_blank" rel="noreferrer" className={styles.platformBadge}>
                      <Tag size="s" style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                        @{handles.leetcode}
                      </Tag>
                    </a>
                  </Row>

                  {lcLoading ? (
                    <Column gap="12" fillWidth className="animate-pulse">
                      <div style={{ height: "24px", background: "var(--neutral-alpha-weak)", borderRadius: "4px" }} />
                      <div style={{ height: "12px", background: "var(--neutral-alpha-weak)", borderRadius: "4px" }} />
                      <div style={{ height: "12px", background: "var(--neutral-alpha-weak)", borderRadius: "4px" }} />
                    </Column>
                  ) : (
                    <Column gap="16" fillWidth>
                      {/* Summary progress bar */}
                      <Column gap="8">
                        <Row horizontal="between" vertical="end">
                          <Text className={styles.metricLabel}>Overall Progress</Text>
                          <Text variant="label-strong-s" style={{ color: "var(--text-primary)" }}>
                            {totalSolved} <span style={{ color: "var(--text-muted)" }}>/ {totalQuestions}</span>
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: `${(totalSolved / totalQuestions) * 100}%`,
                              background: "var(--accent)" 
                            }} 
                          />
                        </div>
                      </Column>

                      {/* Easy Solved */}
                      <Column gap="4">
                        <Row horizontal="between">
                          <Text variant="body-default-xs" style={{ color: "var(--success)", fontWeight: "600" }}>Easy</Text>
                          <Text variant="label-strong-xs" style={{ color: "var(--text-primary)" }}>
                            {easySolved} <span style={{ color: "var(--text-muted)" }}>/ {easyTotal}</span>
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: `${(easySolved / easyTotal) * 100}%`,
                              background: "var(--success)" 
                            }} 
                          />
                        </div>
                      </Column>

                      {/* Medium Solved */}
                      <Column gap="4">
                        <Row horizontal="between">
                          <Text variant="body-default-xs" style={{ color: "var(--warning)", fontWeight: "600" }}>Medium</Text>
                          <Text variant="label-strong-xs" style={{ color: "var(--text-primary)" }}>
                            {mediumSolved} <span style={{ color: "var(--text-muted)" }}>/ {mediumTotal}</span>
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: `${(mediumSolved / mediumTotal) * 100}%`,
                              background: "var(--warning)" 
                            }} 
                          />
                        </div>
                      </Column>

                      {/* Hard Solved */}
                      <Column gap="4">
                        <Row horizontal="between">
                          <Text variant="body-default-xs" style={{ color: "var(--danger)", fontWeight: "600" }}>Hard</Text>
                          <Text variant="label-strong-xs" style={{ color: "var(--text-primary)" }}>
                            {hardSolved} <span style={{ color: "var(--text-muted)" }}>/ {hardTotal}</span>
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: `${(hardSolved / hardTotal) * 100}%`,
                              background: "var(--danger)" 
                            }} 
                          />
                        </div>
                      </Column>
                    </Column>
                  )}
                </Column>
              </div>

              {/* GeeksforGeeks Solved Progress Card */}
              <div className={styles.glassCard}>
                <Column gap="16">
                  <Row horizontal="between" vertical="center" fillWidth>
                    <Row gap="8" vertical="center">
                      <Icon name="geeksforgeeks" size="s" style={{ color: "var(--accent)" }} />
                      <Text variant="heading-strong-m" style={{ color: "var(--text-primary)" }}>GFG Solved</Text>
                    </Row>
                    <a href={`https://www.geeksforgeeks.org/profile/${handles.geeksforgeeks}`} target="_blank" rel="noreferrer" className={styles.platformBadge}>
                      <Tag size="s" style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                        @{handles.geeksforgeeks}
                      </Tag>
                    </a>
                  </Row>

                  {gfgLoading ? (
                    <Column gap="12" fillWidth className="animate-pulse">
                      <div style={{ height: "24px", background: "var(--neutral-alpha-weak)", borderRadius: "4px" }} />
                      <div style={{ height: "12px", background: "var(--neutral-alpha-weak)", borderRadius: "4px" }} />
                      <div style={{ height: "12px", background: "var(--neutral-alpha-weak)", borderRadius: "4px" }} />
                    </Column>
                  ) : (
                    <Column gap="16" fillWidth>
                      {/* Summary progress bar */}
                      <Column gap="8">
                        <Row horizontal="between" vertical="end">
                          <Text className={styles.metricLabel}>Overall Progress</Text>
                          <Text variant="label-strong-s" style={{ color: "var(--text-primary)" }}>
                            {gfgData?.totalSolved || 0} <span style={{ color: "var(--text-muted)" }}>problems</span>
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: "100%",
                              background: "var(--accent)" 
                            }} 
                          />
                        </div>
                      </Column>

                      {/* GFG Easy (School + Basic + Easy) */}
                      <Column gap="4">
                        <Row horizontal="between">
                          <Text variant="body-default-xs" style={{ color: "var(--success)", fontWeight: "600" }}>Easy (School / Basic / Easy)</Text>
                          <Text variant="label-strong-xs" style={{ color: "var(--text-primary)" }}>
                            {(gfgData?.school || 0) + (gfgData?.basic || 0) + (gfgData?.easy || 0)}
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: `${gfgData?.totalSolved ? ((((gfgData.school || 0) + (gfgData.basic || 0) + (gfgData.easy || 0)) / gfgData.totalSolved) * 100) : 0}%`,
                              background: "var(--success)" 
                            }} 
                          />
                        </div>
                      </Column>

                      {/* GFG Medium */}
                      <Column gap="4">
                        <Row horizontal="between">
                          <Text variant="body-default-xs" style={{ color: "var(--warning)", fontWeight: "600" }}>Medium</Text>
                          <Text variant="label-strong-xs" style={{ color: "var(--text-primary)" }}>
                            {gfgData?.medium || 0}
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: `${gfgData?.totalSolved ? (((gfgData.medium || 0) / gfgData.totalSolved) * 100) : 0}%`,
                              background: "var(--warning)" 
                            }} 
                          />
                        </div>
                      </Column>

                      {/* GFG Hard */}
                      <Column gap="4">
                        <Row horizontal="between">
                          <Text variant="body-default-xs" style={{ color: "var(--danger)", fontWeight: "600" }}>Hard</Text>
                          <Text variant="label-strong-xs" style={{ color: "var(--text-primary)" }}>
                            {gfgData?.hard || 0}
                          </Text>
                        </Row>
                        <div className={styles.progressBarContainer}>
                          <div 
                            className={styles.progressBarFill} 
                            style={{ 
                              width: `${gfgData?.totalSolved ? (((gfgData.hard || 0) / gfgData.totalSolved) * 100) : 0}%`,
                              background: "var(--danger)" 
                            }} 
                          />
                        </div>
                      </Column>
                    </Column>
                  )}
                </Column>
              </div>

              {/* Other Coding Profiles */}
              <Column gap="12" fillWidth>
                {/* Codolio Aggregator Card */}
                <a 
                  href="https://codolio.com/profile/generalBR" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={styles.platformBadge}
                  style={{ display: "flex", width: "100%", justifyContent: "space-between", textDecoration: "none", alignItems: "center" }}
                >
                  <Row gap="8" vertical="center">
                    <Icon name="openLink" size="s" style={{ color: "var(--accent)" }} />
                    <Column>
                      <Text variant="label-strong-m" style={{ color: "var(--text-primary)" }}>Codolio Portfolio</Text>
                      <Text variant="body-default-xs" style={{ color: "var(--text-muted)" }}>All-in-one developer track</Text>
                    </Column>
                  </Row>
                  <Icon name="arrowUpRight" size="s" style={{ color: "var(--text-muted)" }} />
                </a>
              </Column>
            </Column>
          </Row>
        </Column>
      </RevealFx>
    </div>
  );
}
