"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
};

const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

const PageTransition = ({ children }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                // A CORREÇÃO DO SCROLL ESTÁ AQUI:
                // 'position: absolute' e 'height: 100%' garantem que a animação ocupe todo o "palco".
                // 'overflowY: auto' torna ESTE elemento a área de rolagem vertical.
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;