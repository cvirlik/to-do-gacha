import React from "react";
import "./index.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  videoSrc?: string;
  onVideoEnd?: () => void;
  rarity?: 'normal' | 'rare' | 'legendary';
}

export default function Modal(props: ModalProps) {
  const [videoPlayed, setVideoPlayed] = React.useState(!props.videoSrc);

  React.useEffect(() => {
    if (props.open) {
      setVideoPlayed(!props.videoSrc);
    }
  }, [props.open, props.videoSrc]);

  return (
    <div
      className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}
    >
      {props.videoSrc && !videoPlayed ? (
        <video
          src={props.videoSrc}
          autoPlay
          className="modal-video"
          onEnded={() => {
            setVideoPlayed(true);
            props.onVideoEnd && props.onVideoEnd();
          }}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        />
      ) : (
        <div className="modal-bg">
            <div className="modal-main">
                <div className="corner-top-right">🟆</div>
                <div className="corner-bottom-left">🟆</div>
                <div className="modal-body">{props.children}</div>
                {props.rarity && (
                  <div className="rarity-stars">
                    {props.rarity === 'legendary' && '🟆🟆🟆🟆🟆'}
                    {props.rarity === 'rare' && '🟆🟆🟆🟆'}
                    {props.rarity === 'normal' && '🟆🟆🟆'}
                  </div>
                )}
                <button type="button" className="btn" onClick={props.onClose}>
                    Close
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
