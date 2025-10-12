"use client";

import {motion, AnimatePresence} from 'framer-motion';
import {usePathname} from 'next/navigation';

const variants = {
    initial: {x: '100%', opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: '-100%', opacity: 0},
};

const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

const PageTransition = ({children}) => {
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
                // A CORREÇÃO ESTÁ AQUI: Removemos 'height: 100%'.
                // Agora o 'div' da animação terá a altura do conteúdo da página, permitindo o scroll.
                // Adicionamos 'display: flex' e 'flexDirection' para garantir que o conteúdo se alinhe corretamente.
                style={{
                    position: 'absolute',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1, // Faz com que o conteúdo ocupe o espaço
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;