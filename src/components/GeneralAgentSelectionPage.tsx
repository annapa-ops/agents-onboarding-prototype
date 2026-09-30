import { useState } from "react";
import { Button, Icon } from "@vibe/core";
import {
  AIColored,
  MoveArrowRight,
  NavigationChevronLeft,
  NavigationChevronRight,
} from "@mondaydotcomorg/icons";
import { MondayMulticolorMark } from "./ProductLogos";
import {
  getSolutionCardsForFocus,
  type GeneralSolutionCard,
} from "../data/generalOnboardingData";
import type { AgentFlowId } from "../data/agentFlows";
import styles from "./GeneralAgentSelectionPage.module.scss";

function SolutionCard({
  card,
  onSelect,
}: {
  card: GeneralSolutionCard;
  onSelect: (card: GeneralSolutionCard) => void;
}) {
  return (
    <article className={styles.solutionCard}>
      <div className={styles.solutionPreview}>
        <img className={styles.solutionImage} src={card.image} alt="" />
      </div>
      <div className={styles.solutionBody}>
        <div className={styles.solutionCopy}>
          <h2 className={styles.solutionTitle}>{card.title}</h2>
          <div className={styles.tagRow}>
            {card.tags.map((tag) => (
              <span key={tag.label} className={styles.tag}>
                {tag.withAi ? (
                  <span className={styles.tagAiIcon} aria-hidden="true">
                    <AIColored size={16} />
                  </span>
                ) : null}
                {tag.label}
              </span>
            ))}
          </div>
          <p className={styles.solutionSummary}>{card.summary}</p>
        </div>
        <div className={styles.solutionCta}>
          <Button
            kind="primary"
            color="fixed-dark"
            size="large"
            rightIcon={MoveArrowRight}
            onClick={() => onSelect(card)}
          >
            Get started
          </Button>
        </div>
      </div>
    </article>
  );
}

export function GeneralAgentSelectionPage({
  focusId,
  onSelectAgent,
  onStartFromScratch,
  embedded = false,
}: {
  focusId: string;
  focusLabel?: string;
  onSelectAgent: (flowId: AgentFlowId, card: GeneralSolutionCard) => void;
  onBack?: () => void;
  onStartFromScratch?: () => void;
  embedded?: boolean;
}) {
  const cards = getSolutionCardsForFocus(focusId);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = cards[activeIndex] ?? cards[0];
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < cards.length - 1;

  const handleCardSelect = (card: GeneralSolutionCard) => {
    onSelectAgent(card.flowId, card);
  };

  const goTo = (index: number) => {
    if (index < 0 || index >= cards.length || index === activeIndex) return;
    setActiveIndex(index);
  };

  if (!activeCard) return null;

  return (
    <div className={embedded ? styles.embeddedPage : styles.page}>
      <div className={styles.content}>
        <div className={styles.headingBlock}>
          <div className={styles.logo}>
            <MondayMulticolorMark />
          </div>
          <h1 className={styles.title}>Choose the right solution for you</h1>
        </div>

        <div className={styles.tabRow} role="tablist" aria-label="Solutions">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={
                  isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
                }
                onClick={() => goTo(index)}
              >
                {card.title}
              </button>
            );
          })}
        </div>

        <div className={styles.stage}>
          <div className={styles.stageInner}>
            <div
              className={
                canGoPrev
                  ? `${styles.peekCard} ${styles.peekCardLeft}`
                  : `${styles.peekCard} ${styles.peekCardLeft} ${styles.peekCardHidden}`
              }
              aria-hidden="true"
            />
            <div
              className={
                canGoNext
                  ? `${styles.peekCard} ${styles.peekCardRight}`
                  : `${styles.peekCard} ${styles.peekCardRight} ${styles.peekCardHidden}`
              }
              aria-hidden="true"
            />

            <div className={styles.cardStack}>
              <SolutionCard
                key={activeCard.id}
                card={activeCard}
                onSelect={handleCardSelect}
              />
            </div>

            {canGoPrev ? (
              <button
                type="button"
                className={`${styles.edgeButton} ${styles.edgeButtonLeft}`}
                aria-label="Previous solution"
                onClick={() => goTo(activeIndex - 1)}
              >
                <Icon icon={NavigationChevronLeft} size={20} />
              </button>
            ) : null}

            {canGoNext ? (
              <button
                type="button"
                className={`${styles.edgeButton} ${styles.edgeButtonRight}`}
                aria-label="Next solution"
                onClick={() => goTo(activeIndex + 1)}
              >
                <Icon icon={NavigationChevronRight} size={20} />
              </button>
            ) : null}
          </div>
        </div>

        <div className={styles.carouselNav}>
          <div className={styles.dots}>
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={
                  index === activeIndex
                    ? `${styles.dot} ${styles.dotActive}`
                    : styles.dot
                }
                aria-label={`Show ${card.title}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>

        <div className={styles.galleryPrompt}>
          <span>None of these quite fit?</span>
          <Button
            kind="secondary"
            size="large"
            className={styles.galleryButton}
            onClick={onStartFromScratch}
          >
            Start from scratch
          </Button>
        </div>
      </div>
    </div>
  );
}
