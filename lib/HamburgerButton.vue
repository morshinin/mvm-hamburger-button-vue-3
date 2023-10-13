<template>
    <div :class="['HamburgerButton', classList]" @click="handleClick">
        <div class="HamburgerButton_bar -top"></div>
        <div class="HamburgerButton_bar -middle"></div>
        <div class="HamburgerButton_bar -bottom"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface Props {
    showHoverEffect?: boolean
    width?: string
    height?: string
    animationSpeed?: string
    barHeight?: string
    color?: string
    hoverColor?: string
}

interface ClassList {
    ['-is-active']: boolean
    ['-is-not-active']: boolean 
    ['-has-hover-effect']: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showHoverEffect: false,
    width: '50px',
    height: '30px',
    animationSpeed: '.5s',
    barHeight: '10%',
    color: '#1b4965',
    hoverColor: '#62b6cb',
})

const isActive: Ref<boolean> = ref(false)
const isAnimatedOnLoad: Ref<boolean> = ref(true)

const classList = computed<ClassList>(() => {
    return {
        ['-is-active']: isActive.value,
        ['-is-not-active']: isAnimatedOnLoad.value,
        ['-has-hover-effect']: props.showHoverEffect,
    }
})

function handleClick() {
    isActive.value = !isActive.value
    isAnimatedOnLoad.value = false
}
</script>

<style lang="scss">
.HamburgerButton {
    $this: &;

    --animation-speed: v-bind(props.animationSpeed);
    --bar-height: v-bind(props.barHeight);
    --color: v-bind(props.color);
    --hover-color: v-bind(props.hoverColor);
    --bar-border-radius: 2px;
    --container-width: v-bind(props.width);
    --container-height: v-bind(props.height);

    width: var(--container-width);
    height: var(--container-height);

    position: relative;

    cursor: pointer;

    &.-has-hover-effect:hover {
        #{$this}_bar {
            background-color: var(--hover-color);
        }
    }

    &_bar {
        background-color: var(--color);
        border-radius: var(--bar-border-radius);

        position: absolute;

        width: 100%;
        height: var(--bar-height);

        transform-origin: center;
        transition: background-color .3s ease-in-out;

       &.-top {
            animation: topOut var(--animation-speed) linear forwards;
            top: 0;
        }

        &.-middle {
            animation: appear var(--animation-speed) step-end forwards;

            top: 50%;
            transform: translateY(-50%);
        }

        &.-bottom {
            animation: bottomOut var(--animation-speed) linear forwards;

            bottom: 0;
            transform-origin: bottom;
        }
    }

    &.-is-active {
        #{$this}_bar {
            &.-top {
                animation: topIn var(--animation-speed) linear forwards;
            }

            &.-middle {
                animation: disappear var(--animation-speed) step-end forwards;
            }

            &.-bottom {
                animation: bottomIn var(--animation-speed) linear forwards;
            }
        }
    }

    &.-is-not-active {
        #{$this}_bar {
            animation: none;
        }
    }
}

@keyframes topIn {
    0% {
        top: 0;
        rotate: 0deg;
    }
    30%, 70% {
        top: 50%;
        transform: translateY(-50%);
        rotate: 0deg;
    }
    100% {
        top: 50%;
        transform: translateY(-50%);
        rotate: 45deg;
    }
}

@keyframes topOut {
    0% {
        top: 50%;
        transform: translateY(-50%);
        rotate: 45deg;
    }
    30%, 70% {
        top: 50%;
        transform: translateY(-50%);
        rotate: -0deg;
    }
    100% {
        top: 0;
        rotate: 0;
    }
}

@keyframes bottomIn {
    0% {
        bottom: 0;
        rotate: 0deg;
    }
    30%, 70% {
        bottom: 50%;
        transform: translate(0, 50%);
        rotate: 0deg;
    }
    100% {
        bottom: 50%;
        transform: translate(0, 50%);
        rotate: -45deg;
    }
}

@keyframes bottomOut {
    0% {
        bottom: 50%;
        transform: translateY(50%);
        rotate: -45deg;
    }
    30%, 70% {
        bottom: 50%;
        transform: translateY(50%);
        rotate: 0deg;
    }
    100% {
        bottom: 0;
        transform: translateY(0);
        rotate: 0deg;
    }
}

@keyframes disappear {
    0% {
        opacity: 1;
    }
    30%, 100% {
        opacity: 0;
    }
}

@keyframes appear {
    0% {
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
}
</style>