import { seatColorMapping } from "@/config"

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

export function calculateSeatBox(e) {
    const expectedWinDemo = Number(e.expected_win_demo) || 0
    const unresolvedSeats = Number(e.unresolved_seats) || 0
    const expectedWinBeijing = Number(e.expected_win_beijing) || 0

    return [
        ...[...Array(expectedWinDemo).keys()].map(() => ({
          color: seatColorMapping.FC_EXPECTED_WIN_DEMO
        })),
        ...[...Array(unresolvedSeats).keys()].map(() => ({
          color: seatColorMapping.UNRESOLVED
        })),
        ...[...Array(expectedWinBeijing).keys()].map(() => ({
          color: seatColorMapping.FC_EXPECTED_WIN_BEIJING
        })),
    ]
}